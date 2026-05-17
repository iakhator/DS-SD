// Section: filestorage
// Auto-extracted from index.html
const _html_filestorage = String.raw`
<div id="sec-filestorage" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 12</span></div><div class="sec-title">Design: File Storage (S3-like)</div></div>
<div class="sec-lead">Blob storage stores immutable files (images, videos, backups) at petabyte scale. The key challenges: data durability (11 nines = 0.000000001% chance of loss), erasure coding vs replication, metadata separation from data, and presigned URLs for secure direct uploads.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>File storage at scale is like a warehouse that must store billions of boxes of wildly different sizes — from thumbnails smaller than a postcard to 4K video files the size of a refrigerator — while guaranteeing that not a single box is ever lost, even if entire warehouse aisles burn down. Unlike a database, which optimizes for structured, queryable, frequently-updated records, a blob store optimizes for write-once, read-many immutable objects. This immutability is the key insight that unlocks the whole design: because files never change after upload, the storage layer can make aggressive durability guarantees through redundancy without worrying about update conflicts.</p>
<p>The core trade-off is between storage cost and durability. Storing three full copies of every file (3× replication) is simple to implement and fast to recover from, but triples your storage bill. Erasure coding (such as Reed-Solomon 4+2) reduces overhead to 1.5× while still surviving multiple simultaneous node failures by splitting a file into data shards and parity shards — any sufficient subset of shards can reconstruct the original. The catch is CPU cost at read time when reconstruction is needed. A second critical trade-off is routing: you never want large file uploads flowing through your API servers, which are sized for metadata operations, not gigabytes of binary data. Presigned URLs solve this elegantly by letting the client upload directly to the storage cluster after the API server generates a short-lived signed token — the API server touches only a few hundred bytes of metadata, not the file itself.</p>
<p>In an interview, separate the metadata problem from the data problem early. Metadata (file ID, owner, size, hash, storage key) lives in a relational database like MySQL and is small and highly queryable. The actual bytes live on a distributed object store and are addressed by an opaque key. A very common mistake is proposing to store files in a database using BLOB columns — this works for kilobytes but catastrophically degrades performance and cost at gigabyte scale. Another misconception is assuming replication is always sufficient for durability; at petabyte scale, erasure coding is how S3 achieves eleven nines of durability without paying 3× the storage cost.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> The presigned URL pattern is a clean separation of concerns: your API server handles auth and metadata (what it is good at), while the client talks directly to the storage cluster for bulk data transfer (what the storage cluster is good at). Neither has to do the other's job.</div>
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
