# PEAK RIOT storefront concept

English / USD ski-mask storefront, inspired by the product-first layout at https://slopepunk.com/products/slopepunk%E2%84%A2-ski-masks.

This is a private pre-launch preview, not a connected commerce backend or a Shopify theme. It provides four design choices, a photo gallery with zoom, quantities, a device-local shopping bag, FAQ, and responsive layouts. It does not accept orders, charge payments, reserve stock, send messages, or fulfill products.

Run locally: `python3 -m http.server 4173 --directory dist`, then visit http://127.0.0.1:4173.

## Provisional content

- PEAK RIOT is a proposed name; brand/domain availability has not been researched.
- $24.99 USD is a placeholder retail price, not a margin or profitability recommendation.
- Four mask photos in `dist/assets/` are copied from the user-provided reference for this private visual preview. Commercial reuse rights and product authenticity are unverified. Replace with licensed supplier or original photos before a public launch.
- Product photos source: slopepunk.com/cdn/shop/files/; filenames begin `hf_20260928_204501_64e2cc1e`, `hf_20260928_204502_3fcc9bd4`, `hf_20260928_204501_4c3e31d0`, and `hf_20260928_204501_d76a72eb`.
- No customer ratings, discount history, stock scarcity, delivery promises, or supplier specifications have been fabricated.

## Required to launch sales

1. Select the commerce platform and connect the owner's store account. Port this presentation into its theme or connect its supported storefront API.
2. Confirm the supplier, actual product/variant identifiers, sample quality, licensed photos, cost, shipping destinations, processing times, tracking, and returns.
3. Set real pricing and taxes, activate payments through the store owner, and connect the supplier/order fulfillment workflow.
4. Add approved shipping, return, privacy, and contact information; place a test order through fulfillment before opening public checkout.

No customer data is stored server-side. The preview bag uses `localStorage` only. Google Fonts serves the typography. Page-defined WebMCP tools mirror design selection and the preview bag only.
