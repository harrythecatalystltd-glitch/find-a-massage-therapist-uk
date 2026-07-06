import type { Metadata } from "next";
import { getTreatmentTypes } from "@/lib/queries";
import { ListingForm } from "./listing-form";

export const metadata: Metadata = {
  title: "List Your Practice",
  description:
    "Add your massage, sports therapy or bodywork practice to the UK's premier wellness directory.",
};

export default async function ListYourPracticePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [treatmentTypes, params] = await Promise.all([getTreatmentTypes(), searchParams]);

  const asString = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <span className="eyebrow">Grow your practice</span>
          <h1>List Your Practice</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            Join the UK&apos;s premier massage and bodywork directory. Free listings link out to
            your website — submit your details below and we&apos;ll review and publish your
            profile.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ListingForm
            treatments={treatmentTypes.map((t) => ({ id: t.id, name: t.name }))}
            hidden={{
              source: asString(params.source),
              utm_source: asString(params.utm_source),
              utm_medium: asString(params.utm_medium),
              utm_content: asString(params.utm_content),
              fbclid: asString(params.fbclid),
            }}
          />
        </div>
      </section>
    </div>
  );
}
