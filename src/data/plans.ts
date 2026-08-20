export type PlanCell =
  | { kind: 'yes' }
  | { kind: 'no' }
  | { kind: 'text'; value: string };

export interface FeatureRow {
  id: string;
  name: string;
  detail: string;
  open: PlanCell;
  enterprise: PlanCell;
}

export interface FeatureGroup {
  id: string;
  label?: string;
  rows: FeatureRow[];
}

export const openPlan = {
  name: 'Open',
  badge: 'Free',
  tag: 'Evaluation only',
  description:
    'A yearly snapshot of the essentials, so you can prototype and evaluate the data before you talk to us.',
  highlights: [
    'Once-a-year snapshot — drifts out of date between releases',
    'Drugs, packages, and classes only',
    'Currently marketed, prescribable products',
    'Manual CSV and Parquet download',
    'Community Slack support',
  ],
  cta: { kind: 'link' as const, label: 'Get CodeRx Open', to: '/open' },
};

export const enterprisePlan = {
  name: 'Enterprise',
  badge: 'Recommended',
  tag: 'Annual subscription',
  description:
    'The full CodeRx Drug Database — every table, every column, refreshed weekly on CodeRx AWS S3 for you to pull.',
  featured: true,
  highlights: [
    'Weekly refresh as upstream sources publish',
    'Every mart and every column',
    'Full history, including obsolete products',
    'CSV and Parquet on CodeRx AWS S3',
    'Dedicated support',
  ],
  cta: {
    kind: 'demo' as const,
    label: 'Book a Demo',
    plan: 'Enterprise',
  },
};

export const featureGroups: FeatureGroup[] = [
  {
    id: 'plan',
    rows: [
      {
        id: 'update-frequency',
        name: 'Update frequency',
        detail:
          'CodeRx Open is a single yearly snapshot and will drift out of date between releases. Enterprise refreshes every week as upstream sources publish, with dated S3 snapshots so you can reproduce past results.',
        open: { kind: 'text', value: 'Yearly' },
        enterprise: { kind: 'text', value: 'Weekly' },
      },
      {
        id: 'support',
        name: 'Support',
        detail:
          'Open includes community support in the CodeRx Slack. Enterprise adds a direct line to our team with dedicated response.',
        open: { kind: 'text', value: 'Community' },
        enterprise: { kind: 'text', value: 'Dedicated' },
      },
    ],
  },
  {
    id: 'terminology',
    label: 'Terminology',
    rows: [
      {
        id: 'drugs',
        name: 'Drugs',
        detail:
          'Open includes currently marketed, prescribable products only, with a limited set of columns. Enterprise includes the full drug history — obsolete, unapproved, and non-prescribable products — and every documented column.',
        open: { kind: 'text', value: 'Limited' },
        enterprise: { kind: 'yes' },
      },
      {
        id: 'packages',
        name: 'Packages (NDCs)',
        detail:
          'Open maps NDCs to the prescribable drugs in the snapshot, with a limited column set. Enterprise includes every package: NDC11, NDC10, and NDC9 formats, marketing dates, labeler, application number, DEA schedule, and more.',
        open: { kind: 'text', value: 'Limited' },
        enterprise: { kind: 'yes' },
      },
      {
        id: 'classes',
        name: 'Classes',
        detail:
          'Open includes a limited classification subset so you can group products therapeutically. Enterprise includes every classification scheme and the full class-to-drug mapping.',
        open: { kind: 'text', value: 'Limited' },
        enterprise: { kind: 'yes' },
      },
      {
        id: 'ingredients',
        name: 'Ingredients',
        detail:
          'Active ingredients with structured strength detail, precise ingredient classifications, and multi-ingredient product components. Also includes inactive ingredients (excipients), with gluten, dye, and preservative flags plus standardized UNII identifiers.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
      {
        id: 'dose-forms',
        name: 'Dose forms',
        detail:
          'Dose form and dose unit data for how a product is administered — tablets, capsules, injections, and the crosswalks needed for clinical and e-prescribing workflows.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing & coverage',
    rows: [
      {
        id: 'pricing',
        name: 'Pricing (NADAC, ASP, J-codes)',
        detail:
          'Acquisition cost and Medicare Part B reimbursement, current and historical: NADAC cost per unit with price-change history, CMS ASP pricing for HCPCS J-codes, and quarterly ASP history.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
      {
        id: 'part-d-plans',
        name: 'Part D plans',
        detail:
          'Medicare Part D plan data for formulary and reimbursement analysis — formularies, tiers, and reimbursement detail.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
    ],
  },
  {
    id: 'packaging',
    label: 'Package details',
    rows: [
      {
        id: 'packaging-details',
        name: 'Packaging details',
        detail:
          'Package dimensions derived from FDA packaging components: outermost and innermost packaging units, total product quantity across nested components, unit of use, unit dose, and inner-outer NDCs.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
      {
        id: 'label-images',
        name: 'Label images',
        detail:
          'DailyMed label images mapped to the NDCs they belong to, with direct image URLs, links back to the DailyMed SPL, and deduplication across SPL sources.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
    ],
  },
  {
    id: 'label',
    label: 'Label information',
    rows: [
      {
        id: 'rems',
        name: 'REMS',
        detail:
          'Active FDA Risk Evaluation and Mitigation Strategy programs, resolved to products — including approved version and goals, package-level NDC mappings, and RxNorm drug mappings per program.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
      {
        id: 'indications',
        name: 'Indications',
        detail:
          'What a drug may treat or prevent, coded for analytics: MeSH and ICD-10-CM condition codes, may_treat and may_prevent relationships, linked to RxNorm clinical products.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
      {
        id: 'storage',
        name: 'Storage and handling',
        detail:
          'Handling requirements for products that cannot sit on an ordinary shelf: cold storage requirements, special handling requirements, and product-level detail.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
    ],
  },
  {
    id: 'operational',
    label: 'Operational',
    rows: [
      {
        id: 'e-prescribing',
        name: 'E-prescribing',
        detail:
          'NCPDP/NCIt crosswalks for interoperability and prescription workflows: one representative NDC per drug product, dose form and dose unit crosswalks, and DEA schedule terminology mappings.',
        open: { kind: 'no' },
        enterprise: { kind: 'yes' },
      },
    ],
  },
];
