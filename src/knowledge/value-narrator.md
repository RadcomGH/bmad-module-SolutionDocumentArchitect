# Value Narrator — Consolidated Guidance

**Focus:** Capture how objectives and value are explained to non-technical stakeholders and executives.

## HA/DR Business Value Communication

When communicating HA/DR value to stakeholders, reference: `reference-docs/04-operations-and-risks/ha-dr-architecture-patterns.md`

### Executive-Friendly HA/DR Messaging

**Resilience Value Statement:**
```
[Solution] ensures continuous service availability through [active-active/geo-redundant] 
architecture, eliminating single points of failure and enabling seamless failover. This 
translates to [99.9%/99.99%/99.999%] uptime, protecting [revenue stream/customer experience/
operational continuity].
```

**RTO Business Impact Translation:**

| Technical RTO | Business Translation |
|---------------|---------------------|
| < 5 minutes | "Near-instant recovery ensures no customer impact or revenue loss" |
| 5-30 minutes | "Rapid recovery minimizes service disruption to under half an hour" |
| 30 min - 2 hours | "Service restored within [X hours], limiting operational impact" |

**RPO Business Impact Translation:**

| Technical RPO | Business Translation |
|---------------|---------------------|
| Zero/Near-zero | "No data loss—every transaction and event is preserved during failover" |
| < 15 minutes | "Minimal data loss window ensures business continuity and audit compliance" |
| 15 min - 1 hour | "Acceptable data loss window for [non-critical workloads/batch processing]" |

### Cost-Benefit Value Narrative

**Investment Justification Pattern:**
> **Note:** Avoid specific pricing. Focus on risk mitigation value and business outcomes.

```
The HA/DR investment delivers:
• **Risk mitigation:** Protects against downtime costs and revenue impact
• **Compliance:** Meets [regulatory/contractual] uptime requirements ([X%] availability)
• **Customer trust:** Ensures [service-level commitments/SLAs] are maintained
• **Competitive advantage:** [Industry-leading/carrier-grade] resilience

**Break-even:** Investment pays for itself after [X] avoided outages over [Y] years.
```

**Tier Value Positioning:**

```markdown
**Tier 1 Resilience (< 5-min RTO, Zero RPO):**
"Mission-critical protection for [customer-facing services/revenue-generating transactions]. 
Active-active architecture ensures instant failover with no service interruption or data loss."

**Tier 2 Resilience (5-30 min RTO, Near-zero RPO):**
"Business-critical protection balancing rapid recovery with cost efficiency. Automated failover 
recovers service within minutes, protecting [customer experience/operational continuity]."

**Tier 3 Resilience (30 min - 2 hr RTO, < 15 min RPO):**
"High availability for [internal platforms/analytics systems] with measured recovery timeframes. 
Cost-optimized architecture meets business requirements without over-investment."
```

### Avoiding Technical Jargon

**Replace technical terms with business outcomes:**

| Technical Term | Business-Friendly Alternative |
|----------------|------------------------------|
| "Active-active geo-redundant" | "Multiple sites running simultaneously for instant backup" |
| "Kubernetes self-healing" | "Automatic recovery from component failures" |
| "Synchronous replication" | "Real-time data protection across locations" |
| "N+K redundancy" | "Extra capacity ensuring service continues if sites fail" |
| "Quorum-based" | "Voting system prevents conflicting operations" |
| "Circuit breaker" | "Protection against cascading failures" |

### Risk Communication (Stakeholder-Appropriate)

**Without HA/DR:**
```
• **Service disruption risk:** Extended downtime per incident
• **Revenue impact:** Significant financial impact during outages
• **Data loss risk:** Potential for lost transactions/events
• **Reputation damage:** Customer trust erosion, SLA penalties
• **Competitive risk:** Fall behind industry standards for resilience
```

**With HA/DR:**
```
• **Continuous availability:** [99.X%] uptime protects revenue and customer experience
• **Automated recovery:** [X-minute] failover minimizes business disruption
• **Data protection:** Near-zero data loss preserves business continuity
• **Competitive positioning:** [Industry-leading/carrier-grade] reliability
• **Compliance confidence:** Meets [regulatory/contractual] requirements
```

---

## Objectives Phrasing Patterns

### "To demonstrate the value of..." Pattern
```
To demonstrate the value of [applying technology/approach] to [organization]'s existing [data/system] 
to automatically [outcome 1], proactively [outcome 2], and deliver [outcome 3] that enable [business benefit 1], 
reduce [pain point], and improve [strategic goal].
```

**Example Structure:**
- **Applying:** "applying [Vendor]'s AI/ML techniques"
- **To:** "[Organization]'s existing [Data Source] data"
- **Outcomes (verbs):** "automatically generate", "proactively detect", "deliver smart alerts"
- **Benefits:** "enable faster decision-making", "reduce operational noise", "improve network/service assurance"

### Multi-Phase Value Pattern
```
Different phases of deployment:
- Phase 1a – [Domain A] [Capability]
- Phase 1b – [Domain B] [Capability]
- Additional value-added functions will be explored as part of Phase 2 of the [initiative].
```

**Key:** Each phase explicitly tied to value delivery; "value-added functions" signals extensibility.

## Solution Summary (Executive-Friendly)

### Opening Line Pattern
```
The proposed solution ingests [data types], applies [AI/ML/advanced techniques] to [action verbs], 
and generates [actionable outputs].
```

### Differentiator Pattern
```
Unlike traditional [old approach]-based [monitoring/analysis/etc.], the [new technology/engine]:
• [Differentiator 1 - learning/adaptation]
• [Differentiator 2 - correlation/intelligence]
• [Differentiator 3 - noise reduction]
• [Differentiator 4 - presentation/action]
```

**Common Differentiators:**
- "Learns from historical data to establish adaptive performance baselines" (vs. static thresholds)
- "Correlates [metrics] across domains to isolate root causes" (vs. siloed alerting)
- "Reduces false positives by filtering and prioritizing only high-impact events" (vs. alert fatigue)
- "Presents results on intuitive dashboard with severity, impacted areas, and suggested actions" (vs. raw data dumps)

### Closing Value Statement
```
This [AI-driven/intelligent/advanced] approach provides [executive-level visibility] while equipping 
[operational teams] with [contextual insights] for [proactive resolution/faster action/etc.].
```

**Pattern:** Bridge executive visibility (strategic) with operational enablement (tactical).

## Outcome Framing (Dashboards, KPIs, Alerts)

### KPI-Driven Value
**Pattern:** Tie KPIs to business decisions, not just technical metrics.

**Example:**
- **Instead of:** "18 KPIs covering RAN, Core, and IMS"
- **Say:** "18 KPIs providing executive visibility into network performance across RAN, Core, and IMS, enabling data-driven capacity planning and SLA management"

### Dashboard Value Statements
**Executive Dashboards:**
- "Executive KPI Hourly/Daily Dashboard - Predefined dashboard (with self-BI capability) showing trending for all KPIs in scope"
- **Value Add:** "self-BI capability" (executives can drill down); "trending" (spot patterns over time)

**AI-Based Alerting Dashboards:**
- "Anomaly detection using dynamic thresholding and prediction"
- "Alarms dashboard reporting anomalies with correlated grouping to help users focus on main issues"
- "Automated emails to configured users reporting anomalies"
- **Value Add:** "dynamic" (adapts), "correlated grouping" (reduces noise), "automated" (proactive)

### Alert Intelligence Framing
**Pattern:** Show how alerts are smarter, not just more.

**Example:**
"Smart Alerts Dashboard showing KPIs, severity, impacted regions/services, and suggested next actions."

**Key Components:**
- **KPIs:** What's affected
- **Severity:** How urgent
- **Impacted regions/services:** Where the problem is
- **Suggested next actions:** What to do (actionable, not just informational)

## Business Considerations (Often Brief)

**Common Patterns:**
- "NA" (not applicable)
- "[POC/Trial duration] decided; system sizing based on assumptions; little change required from POC to production, making seamless transition"
  - **Note:** Sizing is project-specific. Reference this pattern for context but gather fresh sizing per project.
- "Data samples will help understand richness of feed and prepare team for depth/usefulness of outcomes"

**When Present:**
- **Seamless POC-to-Production:** Emphasize low switching cost
- **Data Sample Value:** Highlight learning opportunity during POC
- **Scalability:** Note that sizing accommodates growth

## Use Case Realization (Executive Lens)

### Business Processes
If no impact on business processes: "Not applicable, no impact on [organization] business processes."

If impact exists: Link to TMForum eTOM framework to show alignment with industry-standard process taxonomy.

### Performance KPIs (Value Narrative)
**Pattern:** Don't just list KPIs; explain *why* they matter.

**Example KPI Categories:**
- **Network Capacity:** "SAUs (Subscriber Attached Users) across all technologies" → informs capacity planning, growth forecasting
- **Traffic Volume:** "DL/UL GTP Traffic Volume, Throughput" → validates infrastructure sizing, identifies bottlenecks
- **Service Quality:** "Attach Failure Ratio, Call Success Rate, Call Drop Rate" → directly ties to customer experience, churn risk
- **Mobility:** "5G to 4G handover success" → future-proofing metric as network evolves

### Dashboard Deliverables (Value Narrative)
**Pattern:** Frame dashboards as decision-enablement tools.

**Example:**
- "Executive Dashboards provide transparent, high-level view of network health and SLA performance, tailored for executive stakeholders to enable informed decision-making."
- "AI-Based Alerting proactively identifies deviations and pushes automated alerts to stakeholders, ensuring proactive issue resolution and minimizing operational disruptions."

## Communicating Value by Phase

### Phase-Based Value Delivery Pattern
```
| Phase | Components | Value Delivered |
|-------|------------|-----------------|
| Phase 1a | [Core  & IMS KPI Monitoring] | Executive visibility into core network performance; baseline for AI learning |
| Phase 1b | [RAN KPI Monitoring] | End-to-end visibility (RAN + Core); holistic anomaly detection |
| Phase 2 (future) | [Additional use cases] | Extensibility; ROI on platform investment |
```

**Key:** Each phase delivers standalone value while building toward future capabilities.

## Voice & Tone Guidelines

### Executive-Friendly Voice
- **Active voice:** "The solution ingests... applies... generates..."
- **Outcome-oriented verbs:** enable, reduce, improve, deliver, proactively detect
- **Business impact language:** faster decision-making, operational noise, network/service assurance, executive visibility
- **Avoid jargon:** Explain technical terms or use analogies

### Balancing Technical Credibility with Accessibility
- **Technical grounding:** Mention specific technologies (AI/ML, adaptive baselines, dynamic thresholding) to establish credibility
- **Accessible explanation:** Follow with plain-language benefit ("learns from historical data" → "establishes adaptive baselines" → "reduces false positives")

### Emphasizing Proactive vs. Reactive
**Pattern:** Contrast old (reactive) with new (proactive).

**Example:**
- **Old:** "Traditional rule-based monitoring" → reactive, manual threshold setting, alert fatigue
- **New:** "AI-driven anomaly detection" → proactive, self-learning, intelligent noise reduction

## Business Solution Summary Opening Narrative

### Executive Summary Pattern (Often appears before or within Section 1)
```
[Organization] has [context/challenge]. This solution, deployed under [Project Name], will provide 
[stakeholders] with [outcomes] on the performance of [domain]. The system, based on [technology platform], 
will ingest [data sources], mediate and aggregate as required, and produce [reports/insights] salient to 
the [stakeholder] needs.

Phase [X] of the project is to focus on [scope] while Phase [Y] focuses on [scope]. [Delivery mechanism] 
integrated in the solution will be used to produce [outputs].

Additionally, the [advanced feature], part of the solution, will be used to [capability]. Additional 
[feature type]-based use cases will be explored as the [initiative type] progresses.

The system [operational feature] can be configured to provide [feedback/integration] to [downstream system].

The system based on [vendor]'s [platform] has other modules and functions that may be used for additional 
use cases which can be defined in additional phases.

Although sizing of the system has been based on assumptions, there would be little change in system requirements 
from [POC] to production, making it seamless to move from [POC] to actual production use.

Data samples will help understand the richness of the data feed and prepare the team for the depth and 
usefulness of the outcomes.
```

**Key Elements:**
1. Context/Challenge (the problem)
2. Solution Introduction (platform + capability)
3. Phasing (progressive delivery)
4. Advanced Features (differentiation)
5. Extensibility (future value)
6. Seamless POC-to-Production (de-risking)
7. Data Sample Learning (iterative improvement)

## Consolidation Rules for SDA Agent Use

1. **Objectives = Value Transformation:** Always frame as "demonstrate the value of [technology] to [automatically/proactively] [outcome] that [enable/reduce/improve] [business benefit]"
2. **Differentiator Bullets:** Use "Unlike traditional [X], the [new Y]:" followed by 3-5 bullets contrasting old vs. new
3. **Dashboards = Decision Tools:** Never just "dashboard"; always "dashboard providing [visibility/insights] to enable [decision/action]"
4. **KPIs Tied to Business:** For each KPI category, explain business relevance (capacity planning, customer experience, SLA management)
5. **Phasing = Progressive Value:** Each phase delivers standalone value; communicate "what's in it for executives" per phase
6. **Proactive > Reactive:** Emphasize shift from reactive monitoring to proactive intelligence (AI, ML, adaptive baselines)
7. **Outcome-Oriented Language:** Use action verbs (enable, reduce, improve, deliver, detect) not passive "provides capability to..."

## Reusable Checklists

### Objectives Section Checklist
- [ ] Starts with "To demonstrate the value of..."
- [ ] Technology/approach specified
- [ ] Data source/organization context specified
- [ ] Outcomes listed (automatically generate, proactively detect, deliver)
- [ ] Business benefits explicit (faster decisions, reduced noise, improved assurance)
- [ ] Phasing mentioned if applicable (Phase 1a, 1b, 2)

### Solution Summary Checklist
- [ ] Opening line: "The proposed solution ingests [data], applies [technique], generates [outputs]"
- [ ] Differentiator paragraph: "Unlike traditional [X], the [new Y]:"
- [ ] 3-5 differentiator bullets
- [ ] Closing value statement bridging executive and operational value

### Use Case Realization Checklist
- [ ] KPIs explained with business relevance (not just technical metric names)
- [ ] Dashboards framed as decision-enablement tools
- [ ] AI/alerting explained as proactive intelligence (not just more alerts)
- [ ] Phasing shows progressive value delivery

### Business Considerations Checklist
- [ ] POC-to-production seamlessness emphasized (if applicable)
- [ ] Data sample learning opportunity highlighted (if POC/trial)
- [ ] Extensibility/future use cases mentioned

### Executive-Friendly Voice Checklist
- [ ] Active voice throughout
- [ ] Outcome-oriented verbs (enable, reduce, improve, deliver)
- [ ] Business impact language (not jargon)
- [ ] Proactive vs. reactive framing
- [ ] Technical credibility balanced with accessibility
