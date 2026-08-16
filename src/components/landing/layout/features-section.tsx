import { BarChart3, Boxes, CreditCard, ShoppingCart } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-3xl space-y-12 px-6">
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <h2 className="text-4xl font-semibold">
            Everything you need to run your <span className="text-primary">Business</span>
          </h2>

          <p className="max-w-sm sm:ml-auto text-muted-foreground">
            Crave POS brings sales, inventory, payments, and business insights together in one
            simple platform.
          </p>
        </div>

        <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
          <div className="relative aspect-[88/36] overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-t from-background absolute inset-0 z-10 to-transparent" />

            <img
              src="/hero.png"
              className="absolute inset-0 h-full w-full object-cover"
              alt="Crave POS dashboard"
              width={2797}
              height={1137}
            />
          </div>
        </div>

        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="size-4" />
              <h3 className="text-sm font-medium">Point of Sale</h3>
            </div>

            <p className="text-muted-foreground text-sm">
              Process orders and payments quickly with an intuitive checkout experience.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Boxes className="size-4" />
              <h3 className="text-sm font-medium">Inventory</h3>
            </div>

            <p className="text-muted-foreground text-sm">
              Keep track of your products and stock levels in real time.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <h3 className="text-sm font-medium">Payments</h3>
            </div>

            <p className="text-muted-foreground text-sm">
              Handle transactions smoothly and keep every payment organized.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              <h3 className="text-sm font-medium">Analytics</h3>
            </div>

            <p className="text-muted-foreground text-sm">
              Understand your business with clear sales and performance insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
