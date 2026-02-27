# Technical Wizard — Consolidated Guidance

**Focus:** Extract deployable technical constraints: networking, security controls, compute model, data/storage responsibilities.

## Component Architecture Extraction

When analyzing solution architectures, extract and organize:

### Key Architecture Elements
1. **Component Inventory:** List all major components with roles and responsibilities
2. **Site Topology:** Multi-site distribution patterns (National/BE, Regional, Edge/CDF)
3. **Integration Points:** How components communicate (APIs, message queues, direct DB access)
4. **Data Flow Patterns:** Source → Processing → Storage → Presentation
5. **Deployment Model:** VMs, Kubernetes, hybrid, orchestration layer

### Documentation Structure for Component Architecture
```markdown
| Component | Role | Criticality | Key Responsibilities | Dependencies |
|-----------|------|-------------|---------------------|-------------|
| [name] | [purpose] | HIGH/MEDIUM/LOW | [bullet list] | [upstream services] |
```

### Multi-Layer Architecture Pattern
Document in layers (useful for complex distributed systems):
- **Orchestration Layer:** Management, deployment, configuration
- **Capture/Ingestion Layer:** Data collection at network edge
- **Processing Layer:** Correlation, ETL, transformation
- **Storage Layer:** Databases, file systems, caches
- **Analytics/Presentation Layer:** UIs, APIs, reporting

When reference docs contain detailed component descriptions, create structured summaries like the example in `reference-docs/02-architecture-and-design/radcom-ace-component-architecture.md`.

---

## High Availability & Disaster Recovery Patterns

When designing or documenting HA/DR strategies, reference: `reference-docs/04-operations-and-risks/ha-dr-architecture-patterns.md`

### Standard HA/DR Aspects to Document

1. **Architecture Model:**
   - Active-active geo-redundant (N+K redundancy)
   - Active-passive (1+1 hot standby)
   - Multi-site distribution pattern

2. **Failover Mechanisms:**
   - Kubernetes-native self-healing (pod restart, rescheduling)
   - DNS-based failover (TTL-dependent)
   - Load balancer health check-driven failover

3. **Recovery Objectives:**
   - **RTO Tiers:** < 5min (Tier 1), 5-30min (Tier 2), 30min-2hr (Tier 3)
   - **RPO Tiers:** Zero (sync replication), Near-zero (async high-frequency), < 15min (buffered)

4. **Infrastructure Dependencies:**
   - Kubernetes platform (EKS, AKS, GKE, OpenShift)
   - Persistent storage (block + object)
   - Cross-site networking (VPN, Direct Connect)
   - DNS/LB integration

5. **Data Replication:**
   - Database: Synchronous (zero RPO) vs. Asynchronous (near-zero RPO)
   - Message queue buffering (Kafka, RabbitMQ)
   - File-based replication (rsync, S3 cross-region)

### HA/DR Documentation Table Pattern

```markdown
| HA/DR Aspect | Strategy Description |
|--------------|---------------------|
| **Architecture Model** | [Active-active/Active-passive/N+K model] |
| **Failover Mechanisms** | [Kubernetes self-healing / DNS / LB-based] |
| **RTO** | [X hours/minutes] for [failure type] |
| **RPO** | [Near-zero / X minutes] data loss tolerance |
| **Infrastructure Dependencies** | [K8s platform, storage, networking requirements] |
| **Data Replication** | [Sync/async, frequency, consistency model] |
```

### Failure Isolation Boundaries

Document isolation mechanisms to prevent cascading failures:
- **Circuit breakers:** Prevent retry storms
- **Bulkheads:** Resource pools per service/tenant
- **Rate limiting:** Protect downstream services
- **Graceful degradation:** Disable non-critical features under load

---

## Deployment Architecture Patterns

### Network VPC/Subnet Structure

**Standard Table Format:**
```
| VPC Name | Subnet Name | Description | External Route |
|----------|-------------|-------------|----------------|
| [prefix]-oam-direct | [prefix]-oam-direct-subnet | Inter-site communication; Data import; Tool access | Yes |
| [prefix]-backend | [prefix]-backend-subnet | Inter-site internal communication | No |
| [prefix]-oam-protected | [prefix]-oam-protected-subnet | [Protected operations] | No |
| [prefix]-data-plane | [prefix]-data-plane-subnet | Cross-site data flow | No |
| [prefix]-db-interconnect | [prefix]-db-interconnect-subnet | DB cluster communication | No |
| [prefix]-service-ic | [prefix]-service-ic-subnet | Inter-service communication in cluster | No |
```

**Corresponding CIDR Table:**
```
| VPC Name | Subnet Name | CIDR Block | Secondary Range | External Route |
|----------|-------------|------------|-----------------|----------------|
| [prefix]-oam-direct | [prefix]-oam-direct-subnet | [CIDR notation] | None | Yes |
| [prefix]-backend | [prefix]-backend-subnet | [Private CIDR] | None | No |
| [prefix]-service-ic | [prefix]-service-ic-subnet | [Private CIDR] | [Pod CIDR block] | No |
```

Pattern: Use descriptive prefixes (oam = operations/admin/management, ic = interconnect)

### VPC-to-Component Mapping

**Table Pattern:**
```
| VPC Name | Subnet Name | Related Components |
|----------|-------------|-------------------|
| [vpc]-oam-direct | [vpc]-oam-direct-subnet | [Component A], [Component B], [Component C], [Cluster Worker Nodes] |
| [vpc]-backend | [vpc]-backend-subnet | [Component A], [Component D], [Component E] |
```

Components grouped by deployment type (e.g., orchestration, storage, processing, routing).

### Cross-Subnet Connectivity Requirements

**Pattern:**
- **[Platform A] Instances should have routes to:**
  - [Subnet Type 1]
  - [Subnet Type 2]
- **[Platform B] instances should have routes to:**
  - [Subnet Type X]
  - [Subnet Type Y]
  - [Subnet Type Z]

## Security Architecture Patterns

### Security Solution View Table (Multi-Layer)

**Standard Format:**
```
| No. | Architecture Layer | Application Interface | In-Transit Encryption/Communication | At-Rest Encryption |
|-----|-------------------|----------------------|-------------------------------------|-------------------|
| 1 | Data Extraction | [Method] from [Source] | [Protocol] with [auth method]; [key rotation policy] | Not required / [method] |
| 2 | Data Processing (ETL) | [Component interactions] | **Infra**: [platform] to [platform]<br>**Application Encryption**: [protocol/version] with [rotation]<br>**Supported** | [DB]: Using [key mgmt approach]. Keys stored in [vault]. |
| 3 | Analytics Layer | [Services interactions with DB] | **Infra**: [platform] to [platform]<br>**Application Encryption**: [protocol/version]<br>**Supported** | [Same as above] |
| 4 | Visualization Layer | [Presentation interactions] | **Infra**: [platform] to [platform]<br>**Application Encryption**: [protocol/version]<br>*Roadmap* | Not required |
| 5 | Users Portal | [Entry point] | **Infra**: [platform] to [platform]<br>**Application Encryption**: [protocol/version]<br>**Supported** | Not required |
```

**Key formatting patterns:**
- Use bold for "Infra:" and "Application Encryption:"
- Mark future capabilities with "*Roadmap*"
- Mark tested/confirmed with "**Supported**"
- Use line breaks within cells (<br>) for multi-part answers

### Authentication by Interface Table

```
| Internal/External | Application Interface | Authentication |
|-------------------|----------------------|----------------|
| External | [Source System] to [Target System] | [Method] using [credentials]; (*) requires procedure for [rotation/renewal] |
| External | [Export] to [Destination] | [Protocol] using [auth method]; (*) [TLS/encryption status] |
| Internal | [Component A] to [Component B] | [Credentials]; (*) requires procedure for [rotation] |
| Internal | [Services] to [Visualization] | (*) roadmap |
```

Pattern: Use "Internal/External" to classify data flows; mark gaps/future work with "(*) roadmap"

### Security Group Rules Summary

**Per-VPC Format:**
```
| VPC Name | Security Group Rules Summary |
|----------|------------------------------|
| [vpc-name] | Inbound TCP ports: [comma-separated list] from CIDRs: [comma-separated ranges]; No UDP ports allowed. |
| [vpc-name] | Inbound TCP ports: [list] from CIDRs: [ranges]; UDP ports: [list if any]; Outbound: [if restricted]. |
```

Pattern: Summarize allowed ports and source CIDRs compactly; call out protocol restrictions explicitly.

### Encryption at Rest – Diagram + Description

**Pattern observed:**
- Diagram showing key management flow (e.g., encryption service pods → clients on VMs → vault for keys)
- Bullet description:
  - "[Key service] pods are deployed on [Cluster]."
  - "[Client software] installed on each [resource type requiring encryption]."
  - "[Client] configured to fetch [service]'s public key and combine with [client]'s private key - generating the decryption key."
  - "Multiple [service] servers deployed for redundancy."
  - "Disk encryption 'unlocking' happens automatically during boot sequence."

## Sizing & Infrastructure Patterns

### Application Overview Table (Component List)

```
| Application Type | Instance Type |
|------------------|---------------|
| [Component 1] | [Platform: VM/Container/Cluster] |
| [Component 2] | [Platform] |
```

Example instance types: VM (Google Compute Platform), Container (Kubernetes/GKE), Managed Service

### 3rd Party / Managed Services Table

```
| Third Party Services | Deployment Type | Version |
|----------------------|-----------------|---------|
| [Service A] | Containers | [version] |
| [Service B] | [Platform] Instances | [version] |
```

Pattern: Tracks all external/open-source dependencies with version control

### Volumetric & SLA Table

```
| No | System/Application | Service Type (batch/online/web) | Volume | | | Concurrent Users | | Response Time |
|----|-------------------|--------------------------------|--------|---|---|------------------|---|---------------|
|    |                   |                                | Avg Daily | Peak Hourly | Future Forecast | Avg Concurrent | Peak Concurrent | Average Response Time |
```

Purpose: Document performance requirements for capacity planning

## Deployment Diagram Conventions

### Infrastructure-as-Code Reference

**Pattern observed:**
- "[IaC tool] is used to create and manage the core [platform] infrastructure required for [solution]"
- "The [IaC] templates can create the required internal networks, virtual machines, and [cluster type]"
- "For this [PoC/Lab Trial], manual installation and configuration will be required for customized solution after infrastructure is deployed"
- "In production, the [IaC] templates and manual actions can be incorporated into an automated pipeline"

### Load Balancer / Gateway Info

**Pattern:**
- "Uses [LB type] as [purpose]"
- "[LB] service routes [traffic type] to [cluster nodes] over '[interface name]' interface using '[subnet name]' subnet"
- "Security rules applied using [VPC name]"
- "[VPC] allows only [port list] for [LB] service"

## Data Architecture Patterns (Technical Detail)

### Information Model – Component Descriptions

**Standard component description pattern (per component):**
```
#### [Component Name] ([Platform Type]: VM/GKE/Managed)

- [Purpose statement]
- Acts as [role in architecture]
- [Storage/throughput/replication characteristics]
- [Data type or enrichment served]
- [Sizing detail: e.g., "Quota based storage, X GB per user (configurable), with [retention policy]"]
```

Example roles: analytical data warehouse, object storage, cache, state DB, artifact repository

### Data Flow Interfaces Table

```
| No. | Architecture Layer | Application Interface | Description | Connection Type |
|-----|--------------------|----------------------|-------------|-----------------|
| 1 | [Layer] | [Method] from [Source] | Polls [location] every [interval]; Fetches [data] from [format]; Incorporates retry mechanisms; Facilitates [action] | Transport: [protocol]<br>Application: [method] |
| 2 | [Layer] | [Process] by [Component] | Utilizes [tool] for [operations]; Ingests [data] on [schedule]; Parses [format]; Routes to [destination]; Loads via [method] | Transport: [protocol]<br>Application: [method] |
```

Pattern: Connection Type often split into "Transport" layer and "Application" layer

### Application Communication Table (High-Level)

```
| Application Interface | Application Logic Description | Connection Type |
|-----------------------|-------------------------------|-----------------|
| [Data acquisition method] | * Polls [source] every [interval]<br>* Fetches [data type]<br>* Incorporates retry mechanisms<br>* Facilitates [transformation/mediation] | Transport: [protocol]<br>Application: [method] |
| [ETL Process description] | * Utilizes [tool] module<br>* Parses [format] to extract [fields]<br>* Applies transformations and filters<br>* Loads data via [SQL/API] | Transport: [protocol]<br>Application: [method] |
```

Pattern: Use bullet lists in "Application Logic Description" column for multi-step processes

## Operational Patterns (MOPs / Runbooks)

### Password Rotation MOP Structure

Observed: LLDs include subsections for each credential rotation procedure:
```
[Main heading: Vault password rotation MOP]
  [Subsection: Component A]
  [Subsection: Component B (e.g., DB)]
  [Subsection: Component C (e.g., Authentication)]
  [Subsection: Component D (e.g., Object Storage)]
  [Subsection: Component E (e.g., External Interface like SFTP)]
  [Subsection: Tool UI user/pass rotation]
  [Subsection: Secrets service]
```

Each subsection typically includes step-by-step commands or API calls.

## Consolidation Rules for SDA Agent Use

1. **Networking:** Always provide VPC/subnet structure tables paired with CIDR tables and component-mapping tables—three related tables together
2. **Security Controls:** Use layered security table (extract in-transit + at-rest per layer); supplement with separate auth table (internal vs external)
3. **Platform Segmentation:** Distinguish compute platforms (VMs, containers, managed services) in every component list
4. **Key Rotation Policies:** Always document rotation requirements with (*) markers; include "roadmap" for future capabilities
5. **Connection Types:** Split into Transport (TCP/UDP, protocol) and Application (REST API, SQL, File Polling)
6. **Sizing Abstraction:** Provide volumetric/SLA tables as scaffolding; do NOT hardcode specific instance sizes—use placeholders

## Reusable Checklists

### Deployment Section Checklist
- [ ] VPC/Subnet structure table
- [ ] VPC-to-CIDR mapping table
- [ ] VPC-to-Component mapping table
- [ ] Cross-subnet connectivity requirements (bulleted)
- [ ] Load balancer / gateway configuration and security rules
- [ ] IaC approach and deployment notes

### Security Section Checklist
- [ ] Multi-layer security solution view table (in-transit + at-rest per layer)
- [ ] Authentication table by interface (internal vs external)
- [ ] Security group rules summary (per VPC)
- [ ] Encryption at rest diagram + description (key management flow)
- [ ] Encryption in transit (TLS versions, certificate rotation policies)

### Data/Storage Section Checklist
- [ ] Component descriptions (role, platform type, sizing, retention)
- [ ] Data flow interfaces table (layer, method, connection types)
- [ ] Application communication table (high-level logic per interface)
- [ ] 3rd-party/managed services table with versions

### Operations Checklist
- [ ] Password/credential rotation MOPs (per component)
- [ ] Monitoring and alerting hooks
- [ ] Backup/restore approach
- [ ] Disaster recovery considerations

