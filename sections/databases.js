// Section: databases
// Auto-extracted from index.html
const _html_databases = String.raw`
<div id="sec-databases" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 03</span></div><div class="sec-title">Databases & Storage Engines</div></div>
<div class="sec-lead">Choosing the right database is one of the highest-leverage decisions in system design. The wrong choice means rewrites at 10x scale. Understand the fundamental trade-offs: SQL vs NoSQL, strong vs eventual consistency, horizontal vs vertical scaling, OLTP vs OLAP.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">SQL vs NoSQL Decision Tree</div>
<div class="tbl-wrap"><table>
<thead><tr><th>Factor</th><th>SQL (RDBMS)</th><th>NoSQL</th></tr></thead>
<tbody>
<tr><td>Data shape</td><td>Structured, tabular, relationships</td><td>Flexible, nested, varied schema</td></tr>
<tr><td>ACID transactions</td><td>Yes — native, strong</td><td>Varies — often eventual consistency</td></tr>
<tr><td>Query patterns</td><td>Complex joins, aggregations, ad-hoc</td><td>Access patterns known at design time</td></tr>
<tr><td>Horizontal scaling</td><td>Hard (sharding is manual, painful)</td><td>Built-in (Cassandra, DynamoDB)</td></tr>
<tr><td>Scale</td><td>Millions of rows easily; billions get hard</td><td>Designed for billions of records</td></tr>
<tr><td>Use cases</td><td>Finance, e-commerce, CMS, ERPs</td><td>Social feeds, IoT, catalogs, time-series</td></tr>
</tbody>
</table></div>

<div class="h2">Replication & Sharding</div>
<div class="arch-box"><pre>
REPLICATION — copies of the same data for availability + read scaling
─────────────────────────────────────────────────────────────────────
Primary-Replica (Master-Slave):
  Primary handles all writes → streams changes to replicas
  Replicas serve read traffic (scale reads horizontally)
  Failover: promote a replica to primary (seconds to minutes)
  Risk: replication lag — reads from replica may be stale

  [Primary] ──writes──► [Replica 1]
                    ──► [Replica 2]  ← read traffic
                    ──► [Replica 3]

Primary-Primary (Multi-Master):
  Multiple nodes accept writes → more write availability
  Conflict resolution required (last-write-wins, vector clocks)
  Used by: CockroachDB, Galera Cluster

SHARDING — partition data across multiple nodes for write scaling
──────────────────────────────────────────────────────────────────
Range Sharding:
  shard1: user_id 0-999999
  shard2: user_id 1000000-1999999
  Easy to range scan. Hot spots if distribution uneven.

Hash Sharding:
  shard = hash(user_id) % num_shards
  Even distribution. Can't range scan efficiently.

Directory Sharding:
  Lookup service maps keys to shards
  Flexible routing. Lookup service is a bottleneck/SPOF.

Cons of sharding:
  - Cross-shard queries are complex (no JOINs across shards)
  - Re-sharding is expensive (consistent hashing mitigates)
  - Operational complexity increases significantly
</pre></div>

<div class="h2">Indexing — How Databases Speed Up Reads</div>
<div class="arch-box"><pre>
B-Tree Index (most common):
  Balanced tree. O(log n) lookup, O(log n) range scan.
  Good for: equality and range queries on high-cardinality columns.
  SELECT * FROM users WHERE email = '<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="fb9a9f9abb9e839a968b979ed5989496">[email&#160;protected]</a>'  → uses index

LSM-Tree (Log-Structured Merge):
  Writes go to in-memory buffer (memtable) → flushed to sorted SSTable files
  Merge (compaction) happens in background
  Extremely fast writes. Slower reads (check multiple SSTables).
  Used by: Cassandra, RocksDB, LevelDB, ClickHouse

Composite Index: INDEX(a, b, c) → useful for WHERE a=x AND b=y
  Left-prefix rule: can use for (a), (a,b), (a,b,c) — not (b) alone

Index tradeoffs:
  Speeds up reads. Slows down writes (must update index on insert/update).
  Rule of thumb: index columns you filter or sort by frequently.
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_databases.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
