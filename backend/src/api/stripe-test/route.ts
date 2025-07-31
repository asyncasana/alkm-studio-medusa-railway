import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // Check if Stripe environment variables are configured
    const stripeConfigured = !!(
      process.env.STRIPE_API_KEY && process.env.STRIPE_WEBHOOK_SECRET
    );

    // Basic configuration test
    const testResult: any = {
      status: "testing",
      timestamp: new Date().toISOString(),
      stripe: {
        configured: stripeConfigured,
        hasApiKey: !!process.env.STRIPE_API_KEY,
        hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
        apiKeyPrefix: process.env.STRIPE_API_KEY
          ? `${process.env.STRIPE_API_KEY.substring(0, 12)}...`
          : "not configured",
      },
    };

    // If Stripe is configured, try to access the payment module
    if (stripeConfigured) {
      try {
        const container = req.scope;

        // Try to resolve the payment module service
        const paymentModuleService: any = container.resolve(
          "paymentModuleService"
        );

        if (paymentModuleService) {
          testResult.stripe.paymentModuleLoaded = true;

          // Try to list payment providers
          const providers = await paymentModuleService.listPaymentProviders();
          testResult.stripe.providers = providers.length;
          testResult.stripe.providerDetails = providers.map((p: any) => ({
            id: p.id,
            is_enabled: p.is_enabled,
          }));
        }
      } catch (moduleError) {
        testResult.stripe.paymentModuleError = moduleError.message;
        testResult.stripe.paymentModuleLoaded = false;
      }
    }

    res.status(200).json(testResult);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
