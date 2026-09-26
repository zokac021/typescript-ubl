# Examples

Small programs that use only the public `typescript-ubl` API.

Build the package first (`npm run build`), then run an example with Node.js 22.18 or later, which runs TypeScript directly:

```bash
node examples/create-invoice.ts
node examples/create-despatch-advice.ts
node examples/parse-unknown-document.ts
node examples/parse-known-document.ts
```

| Example | Shows |
|---|---|
| `create-invoice.ts` | build an `InvoiceInput`, `validateUbl`, `serializeUbl` |
| `create-despatch-advice.ts` | the same for a `DespatchAdvice` |
| `parse-unknown-document.ts` | `parseUbl` on XML of unknown type, narrowing with `isUblDocument` |
| `parse-known-document.ts` | `parseUblAs` for a known document type, and the error for the wrong one |

The examples use generic OASIS UBL 2.1 structures only; they do not implement any national or business profile.
