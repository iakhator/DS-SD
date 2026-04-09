// Section: filestorage
// Auto-extracted from index.html
const _html_filestorage = String.raw`
<div id="sec-filestorage" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 12</span></div><div class="sec-title">Design: File Storage (S3-like)</div></div>
<div class="sec-lead">Blob storage stores immutable files (images, videos, backups) at petabyte scale. The key challenges: data durability (11 nines = 0.000000001% chance of loss), erasure coding vs replication, metadata separation from data, and presigned URLs for secure direct uploads.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Architecture</div>
<div class="arch-box"><pre>
UPLOAD FLOW:
────────────────────────────────────────────────────────────
Client ──► API Server (POST /upload)
                │
                1. Generate file_id + presigned URL (signed S3 URL)
                2. Return presigned URL to client
                │
Client ──► Upload Service (PUT with presigned URL — directly to storage)
                │
                3. Client uploads directly to storage cluster (bypass API server)
                4. Storage acknowledges to client
                5. Client notifies API server "upload complete" with file_id
                │
           API Server records metadata in DB:
             file: {id, owner, s3_key, size, hash, created_at, content_type}

This avoids routing large file data through your API servers (bandwidth savings).

STORAGE CLUSTER:
  Data Nodes: Store raw file chunks (64MB per chunk for large files)
  Metadata DB: MySQL — {file_id, chunk_ids, size, hash, created_at}
  
DURABILITY — Two approaches:
  
  Replication (simple): store 3 copies on different racks/AZs
    Space amplification: 3× storage. Simple to implement.
    Used for: hot data, small objects, time-sensitive access.
  
  Erasure Coding (efficient): Reed-Solomon (4+2 or 6+3)
    Split file into 4 chunks + 2 parity chunks across 6 nodes.
    Can reconstruct from any 4 of 6. 
    Space amplification: 1.5×. More CPU. Harder.
    Used by: Facebook f4 (cold storage), Backblaze, Azure.

ACCESS CONTROL:
  Presigned URLs: API signs URL with secret key, TTL embedded
    GET https://storage.example.com/files/{id}?X-Signature=abc&X-Expires=1696435200
    Storage node validates signature + expiry without DB lookup
    
  Revocation: track revoked tokens in Redis bloom filter. 
  After expiry, token naturally dies.
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_filestorage.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
