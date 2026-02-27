# Solution Designer — Consolidated Guidance

**Focus:** Normalize architecture structure and diagram/storytelling conventions across documents.

## Distributed System Architecture Patterns

When designing solutions with complex component ecosystems:

### Layered Architecture Approach
Organize components by architectural layer:

1. **Management/Orchestration Layer:** Deployment, configuration, monitoring
2. **Data Ingestion Layer:** Capture, collection, tapping at network edge  
3. **Processing Layer:** Correlation, ETL, transformation, enrichment
4. **Storage Layer:** Data persistence (SQL, NoSQL, object storage, caching)
5. **Analytics Layer:** ML/AI, forecasting, anomaly detection
6. **Presentation Layer:** UIs, APIs, dashboards, reporting

### Multi-Site Topology Pattern
Common in telco/network solutions:
- **Central/National Site:** System services, management, aggregation
- **Regional Sites:** Mid-tier processing, regional aggregation
- **Edge/CDF Sites:** Data capture at network edge, distributed probes

### Microservices Integration Patterns
Document how microservices coordinate:
- **Synchronous:** REST APIs, gRPC
- **Asynchronous:** Message queues (RabbitMQ, Kafka), event streams
- **Data-Driven:** Shared databases (with clear ownership), pub/sub
- **Orchestrated:** Central orchestrator (K8s operators, workflow engines)

### Component Relationship Diagrams
Use consistent notation:
```
Component A (role)
    ↓ (data type)
Component B (role)
    ↓
├→ Component C (role)
└→ Component D (role)
```

See structured example: `reference-docs/02-architecture-and-design/radcom-ace-component-architecture.md`

---

## HA/DR Architecture Design Patterns

For HA/DR design decisions, reference: `reference-docs/04-operations-and-risks/ha-dr-architecture-patterns.md`

### HA Architecture Selection

**Active-Active (N+K):**
- **When to use:** Mission-critical services, high availability requirements, geographic load distribution
- **Trade-offs:** Higher infrastructure investment (N+K capacity), complex data consistency, lower RTO
- **RTO:** < 5-15 minutes (automatic failover)
- **RPO:** Near-zero (real-time replication)

**Active-Passive (1+1):**
- **When to use:** Business-critical services, moderate availability requirements, cost optimization
- **Trade-offs:** Lower infrastructure investment (2x capacity), simpler design, higher RTO
- **RTO:** 15 minutes - 2 hours (manual or semi-automated)
- **RPO:** Minutes to hours (async replication)

### RTO/RPO Tier Alignment

Align customer requirements with feasible tiers:

**Mission-Critical (Tier 1):**
- RTO: < 5 minutes
- RPO: Zero (sync replication)
- Architecture: Active-active, instant failover
- Investment: Highest (2N capacity, sync replication overhead)

**Business-Critical (Tier 2):**
- RTO: 5-30 minutes
- RPO: Near-zero (< 1 minute)
- Architecture: Hot standby, automated failover
- Investment: High (1+1 capacity, async replication)

**High Availability (Tier 3):**
- RTO: 30 minutes - 2 hours
- RPO: < 15 minutes
- Architecture: Warm standby, semi-automated
- Investment: Moderate (standby can be smaller SKU)

### Multi-Site Topology Decisions

**Two-Site (Primary + DR):**
```
Site A (Primary) ◄──────► Site B (DR)
       │                      │
       └──── Sync/Async ──────┘
              Replication
```
- Simplest HA/DR model
- Single point of management
- Risk: Split-brain if connectivity lost

**Three-Site (Quorum-Based):**
```
Site A ◄────► Site B
  │              │
  └────► Site C ◄┘
       (Arbiter)
```
- Prevents split-brain (quorum voting)
- Higher availability (tolerate 1 site failure)
- Arbiter can be lightweight (witness node)

**Regional Multi-Site (Edge + Central):**
```
Edge Sites (Data Collection)
  ↓    ↓    ↓    ↓
Regional Processing (N+K)
  ↓    ↓
Central Aggregation (1+1)
```
- Telco/IoT pattern
- Data processed near source
- Central backup for aggregated data

### HA/DR Cost-Benefit Trade-Off Table

> **Note:** Avoid specific pricing in trade-off tables. Focus on relative complexity and resource requirements.

Use this pattern for architecture decision documentation:

```markdown
| Aspect | Option A | Option B | Recommendation |
|--------|----------|----------|----------------|
| **Architecture** | Active-passive (1+1) | Active-active (2N) | [Choice + rationale] |
| **RTO** | 1 hour (manual) | 5 min (automated) | [Choice + rationale] |
| **RPO** | 15 min (async) | Zero (sync) | [Choice + rationale] |
| **Complexity** | Lower | Higher | [Choice + rationale] |
| **Resource Investment** | Moderate | High | [Choice + rationale] |
```

---

## Architecture Section Spine (Standard Flow)

### Project Context
- **Purpose:** Set the stage - what this project is solving
- **Hosting and Integration:** "[Solution] will be hosted on [platform]. It will integrate with [primary data sources]..."
- **End-to-End Coverage:** Multi-domain, multi-phased
- **Visualization and Insights Delivery:** How outcomes are presented
- **Anomaly Detection / Advanced Analytics:**  How intelligence is added
- **Solution Overview:** High-level architecture narrative

### In-Scope Applications Table
```
| Application | Functionality |
|-------------|---------------|
| [Component A] | * Bullet 1<br>* Bullet 2<br>* Bullet 3 |
| [Component B] | * Bullet 1<br>* Bullet 2 |
```

**Pattern:** Use bullets within table cells to describe multi-faceted functionality

### Application Communication Table
```
| Application Interface | Application Logic Description | Connection Type |
|-----------------------|-------------------------------|-----------------|
| [Interface 1] | * Bullet describing flow<br>* Bullet describing data<br>* Bullet describingtransformation | Transport: [TCP/UDP/etc]<br>Application: [REST/SQL/File/etc] |
```

**Pattern:** Connection Type split into Transport + Application layers

## Feature-Based (Logical) Architecture Pattern

**Typical Layers:**
1. **Data Acquisition / Capture Layer:** How data enters the system (e.g., "Capturing Device Function (CDF)" or "Data Collector")
2. **Processing / Mediation Layer:** Data transformation, routing, enrichment
   - Sub-components: Router, Processor, Message Queue (Kafka), ETL
3. **Storage / Data Lake Layer:** Where data persists
   - Analytical warehouse (Vertica, Snowflake, BigQuery)
   - Object storage (MinIO, S3, GCS)
   - State/config DB (MongoDB, PostgreSQL)
   - Cache (Ignite, Redis)
4. **Management / Orchestration Layer:** Control plane
   - Conductor, Deployment tools, Configuration management
5. **Visualization / Analytics Layer:** User-facing outputs
   - Dashboards (Grafana, custom UI)
   - BI tools
6. **AI/ML Layer:** Advanced analytics (anomaly detection, forecasting, alerting)

**Diagram Convention:** Layered horizontal or vertical stack showing data flow top-to-bottom or left-to-right.

## Component Taxonomy (Consistent Naming)

### Front-End vs. Back-End Pattern
- **Front-End (FE) / Capturing Device Function (CDF):** Data ingestion points, probes, collectors
- **Back-End (BE):** Processing, routing, storage, management, visualization

Within BE, sub-categorize:
- **Processing:** QRouter, Processing nodes, Kafka, stream processors
- **Storage:** Vertica, object storage, Mongo, Ignite cache, SRP/Repo
- ** Management:** Conductor, OAM services, orchestration
- **Visualization:** NAM, SAM, PAM, Grafana, custom dashboards
- **AI/ML:** AIM (Anomaly Detection Module), ML services

### Deployment Platform Markers
Always specify deployment type:
- **VM / GCP / GCE:** Virtual machines on cloud
- **Containers / GKE / Kubernetes:** Container-orchestrated
- **Managed Service:** Cloud-native managed (e.g., Cloud SQL, BigQuery)

Example: "Vertica DB (VM)", "NAM (Network Analytics Tool) (GKE)", "Grafana (Containers)"

## Solution Flows (End-to-End)

### Data Flow Diagram Patterns

**Numbered Flows Table:**
```
| Data Flow # | Source System | Target System(s) | Description |
|-------------|---------------|------------------|-------------|
| 1 | [System A] | [System B] | [High-level description of data type and purpose] |
| 2 | [System B] | [System C] | [Description] |
```

**Detailed Flow Narratives:**
Present flows as:
1. **KPI Acquisition / Ingestion Flow**
   - Source → Collector → Processing → Storage
2. **User Query / Dashboard Flow**
   - User → Visualization Layer → Analytical DB → Results
3. **Anomaly Detection / Alerting Flow**
   - Data → ML Model → Anomaly Table → Alert Service → Notification

Each flow includes:
- Diagram (sequence or data-flow style)
- Narrative description (bullets or numbered steps)
- Key components involved
- Data formats/transformations at each step

## Diagram Inventory (Standard Set for HLD/LLD)

### Required Diagrams
1. **Logical Architecture Diagram**
   - Shows layers/components without deployment details
   - Focus: data flow, functional boundaries, integration points

2. **Deployment Diagram**
   - Shows VPCs, subnets, clusters, VMs
   - Focus: infrastructure, network segmentation, security boundaries

3. **Data Flow Diagram**
   - Shows data movement between systems
   - Focus: integration interfaces, data formats, frequency

4. **Sequence Diagram** (optional but common in LLDs)
   - Shows interaction over time between components
   - Focus: API calls, message sequences, timing

### Diagram Conventions
- Use standard iconography (cloud, database, server, user)
- Label all interfaces with protocol/method
- Show directionality of data flow (arrows)
- Group related components visually (boxes/swim lanes)
- Include legend if using custom symbols

## Enterprise Services Pattern

### Table Structure
```
| Service Name | Producing Application | New | Existing |
|--------------|----------------------|-----|----------|
| [Service] | [App] | [X if new] | [X if existing] |
```

**Common Response:** "Not applicable" or "NA" if no enterprise services dependency

Purpose: Track which shared services (LDAP, SMTP, monitoring, logging, identity provider) the solution depends on.

## Use Case Realization Patterns

### Business Processes Table
```
| [Organization] Business Process | Business Owner | Frameworx Process | Process Identifier | Notes |
|---------------------------------|----------------|-------------------|-------------------|-------|
| [Process name] | [Owner name] | [TMForum category] | [ID] | |
```

**Common Response for vendor-provided solutions:** "Not applicable, no impact on [organization] business processes."

### Performance KPIs Table (Detailed)
```
| KPI # | Test title | Formula | Test Case Description |
|-------|-----------|---------|----------------------|
| 1 | [KPI Name] | [Formula using source metrics] | Test KPI accuracy based on agreed formulas. |
| 2 | [KPI Name] | [Formula] | Test KPI accuracy based on shared formulas from [org] |
```

**Pattern:** KPIs numbered sequentially; formulas show source counters; test case column documents validation approach.

### Dashboards (Executive / Analytics)

**Standard Deliverables:**
- **Executive KPI Hourly Dashboard:** Predefined dashboard (with self-BI capability) showing hourly trending for all KPIs in scope
- **Executive KPI Daily Dashboard:** Daily trending for all KPIs
- **AI Based Alerting / Anomaly Dashboards:**
  - Alarm KPI Overview (anomaly detection using dynamic thresholding and prediction)
  - Alarm Overview Dashboard (reports anomalies)
  - Alarm Grouping Dashboard (correlated/grouped alerts)
  - Automated Alerts (email/webhook notifications)

## Data Architecture Deep Dive Patterns

### Information Model (Component-by-Component)

**Template per component:**
```
#### [Component Name] ([Platform: VM/GKE/Managed])

- [Purpose statement]
- Acts as [role: analytical warehouse / object storage / cache / state DB]
- [Technical characteristics: throughput, replication, data structures]
- [Data type stored: e.g., enrichment data, aggregations, user profiles, traces]
- [Sizing: quota, retention policy]
```

Example:
"Data Storage (VERTICA) (VM): Installed in backend; Acts as analytical data warehouse with high throughput for incoming/outgoing data and replicated data across nodes; Stores enrichment data (IP → equipment mappings) and aggregations (1hour, 1day KPIs); Enables rapid dashboard creation."

### Data Integration Details Table
```
| Int # | Source System | Target System(s) | Initial Load / One Time On-Going Load | Interface Type (Real-Time/Batch) | Description | Technology |
|-------|---------------|------------------|---------------------------------------|----------------------------------|-------------|------------|
| 1 | [Source] | [Target] | Periodic, [frequency] | Batch | [Description] | [Tool/Protocol] |
```

## Consolidation Rules for SDA Agent Use

1. **Architecture Spine is Layered:** Always present logical architecture as layers (acquisition → processing → storage → visualization → AI/ML); label each layer clearly
2. **Component Taxonomy Consistent:** Use FE/BE split; within BE, categorize as Processing, Storage, Management, Visualization, AI/ML
3. **Platform Tags Mandatory:** Every component must have deployment platform marker (VM/GKE/Containers/Managed)
4. **Diagrams Are First-Class:** Logical, Deployment, Data Flow diagrams are mandatory; Sequence diagrams common in LLDs
5. **Flows Are Numbered and Narrated:** Data flows get unique IDs; each flow includes table entry + diagram + narrative description
6. **KPIs Get Formulas:** Performance KPI table includes formula column showing source metrics; align with testing approach

## Reusable Checklists

### Architecture Section Completeness
- [ ] Project context narrative (hosting, integration, coverage, visualization, analytics)
- [ ] Feature-based (logical) architecture diagram
- [ ] In-scope applications table with functionality bullets
- [ ] Application communication table (interface, logic, connection type)
- [ ] Enterprise services table (or "NA")
- [ ] Use case realization (business processes, KPIs, dashboards)

### Diagram Checklist
- [ ] Logical architecture diagram (layered, labeled)
- [ ] Deployment diagram (VPC/subnets/clusters/VMs)
- [ ] Data flow diagram (numbered flows, source → target)
- [ ] Sequence diagram (if LLD or complex interactions)
- [ ] Legend included if custom symbols used

### Component Documentation Checklist (per component)
- [ ] Component name
- [ ] Deployment platform (VM/GKE/Managed)
- [ ] Purpose/role statement
- [ ] Technical characteristics (throughput, replication, etc.)
- [ ] Data type stored/served
- [ ] Sizing (quota, retention)

### Data Flow Checklist (per flow)
- [ ] Flow assigned unique ID
- [ ] Source and target systems identified
- [ ] Description of data type and purpose
- [ ] Diagram showing flow visually
- [ ] Narrative description (bullets or steps)
- [ ] Key components involved listed
- [ ] Data formats/transformations documented
