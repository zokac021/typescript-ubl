// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.

import { createDocumentRegistry } from "../../runtime/schema.js";
import { ApplicationResponse } from "../documents/application-response.js";
import { AttachedDocument } from "../documents/attached-document.js";
import { AwardedNotification } from "../documents/awarded-notification.js";
import { BillOfLading } from "../documents/bill-of-lading.js";
import { CallForTenders } from "../documents/call-for-tenders.js";
import { Catalogue } from "../documents/catalogue.js";
import { CatalogueDeletion } from "../documents/catalogue-deletion.js";
import { CatalogueItemSpecificationUpdate } from "../documents/catalogue-item-specification-update.js";
import { CataloguePricingUpdate } from "../documents/catalogue-pricing-update.js";
import { CatalogueRequest } from "../documents/catalogue-request.js";
import { CertificateOfOrigin } from "../documents/certificate-of-origin.js";
import { ContractAwardNotice } from "../documents/contract-award-notice.js";
import { ContractNotice } from "../documents/contract-notice.js";
import { CreditNote } from "../documents/credit-note.js";
import { DebitNote } from "../documents/debit-note.js";
import { DespatchAdvice } from "../documents/despatch-advice.js";
import { DocumentStatus } from "../documents/document-status.js";
import { DocumentStatusRequest } from "../documents/document-status-request.js";
import { ExceptionCriteria } from "../documents/exception-criteria.js";
import { ExceptionNotification } from "../documents/exception-notification.js";
import { Forecast } from "../documents/forecast.js";
import { ForecastRevision } from "../documents/forecast-revision.js";
import { ForwardingInstructions } from "../documents/forwarding-instructions.js";
import { FreightInvoice } from "../documents/freight-invoice.js";
import { FulfilmentCancellation } from "../documents/fulfilment-cancellation.js";
import { GoodsItemItinerary } from "../documents/goods-item-itinerary.js";
import { GuaranteeCertificate } from "../documents/guarantee-certificate.js";
import { InstructionForReturns } from "../documents/instruction-for-returns.js";
import { InventoryReport } from "../documents/inventory-report.js";
import { Invoice } from "../documents/invoice.js";
import { ItemInformationRequest } from "../documents/item-information-request.js";
import { Order } from "../documents/order.js";
import { OrderCancellation } from "../documents/order-cancellation.js";
import { OrderChange } from "../documents/order-change.js";
import { OrderResponse } from "../documents/order-response.js";
import { OrderResponseSimple } from "../documents/order-response-simple.js";
import { PackingList } from "../documents/packing-list.js";
import { PriorInformationNotice } from "../documents/prior-information-notice.js";
import { ProductActivity } from "../documents/product-activity.js";
import { Quotation } from "../documents/quotation.js";
import { ReceiptAdvice } from "../documents/receipt-advice.js";
import { Reminder } from "../documents/reminder.js";
import { RemittanceAdvice } from "../documents/remittance-advice.js";
import { RequestForQuotation } from "../documents/request-for-quotation.js";
import { RetailEvent } from "../documents/retail-event.js";
import { SelfBilledCreditNote } from "../documents/self-billed-credit-note.js";
import { SelfBilledInvoice } from "../documents/self-billed-invoice.js";
import { Statement } from "../documents/statement.js";
import { StockAvailabilityReport } from "../documents/stock-availability-report.js";
import { Tender } from "../documents/tender.js";
import { TenderReceipt } from "../documents/tender-receipt.js";
import { TendererQualification } from "../documents/tenderer-qualification.js";
import { TendererQualificationResponse } from "../documents/tenderer-qualification-response.js";
import { TradeItemLocationProfile } from "../documents/trade-item-location-profile.js";
import { TransportExecutionPlan } from "../documents/transport-execution-plan.js";
import { TransportExecutionPlanRequest } from "../documents/transport-execution-plan-request.js";
import { TransportProgressStatus } from "../documents/transport-progress-status.js";
import { TransportProgressStatusRequest } from "../documents/transport-progress-status-request.js";
import { TransportServiceDescription } from "../documents/transport-service-description.js";
import { TransportServiceDescriptionRequest } from "../documents/transport-service-description-request.js";
import { TransportationStatus } from "../documents/transportation-status.js";
import { TransportationStatusRequest } from "../documents/transportation-status-request.js";
import { UnawardedNotification } from "../documents/unawarded-notification.js";
import { UtilityStatement } from "../documents/utility-statement.js";
import { Waybill } from "../documents/waybill.js";

/** The 65 UBL documents, by root element name. Imports every document; for parsing unknown documents only. */
export const ublDocuments = /*#__PURE__*/ createDocumentRegistry([
	ApplicationResponse,
	AttachedDocument,
	AwardedNotification,
	BillOfLading,
	CallForTenders,
	Catalogue,
	CatalogueDeletion,
	CatalogueItemSpecificationUpdate,
	CataloguePricingUpdate,
	CatalogueRequest,
	CertificateOfOrigin,
	ContractAwardNotice,
	ContractNotice,
	CreditNote,
	DebitNote,
	DespatchAdvice,
	DocumentStatus,
	DocumentStatusRequest,
	ExceptionCriteria,
	ExceptionNotification,
	Forecast,
	ForecastRevision,
	ForwardingInstructions,
	FreightInvoice,
	FulfilmentCancellation,
	GoodsItemItinerary,
	GuaranteeCertificate,
	InstructionForReturns,
	InventoryReport,
	Invoice,
	ItemInformationRequest,
	Order,
	OrderCancellation,
	OrderChange,
	OrderResponse,
	OrderResponseSimple,
	PackingList,
	PriorInformationNotice,
	ProductActivity,
	Quotation,
	ReceiptAdvice,
	Reminder,
	RemittanceAdvice,
	RequestForQuotation,
	RetailEvent,
	SelfBilledCreditNote,
	SelfBilledInvoice,
	Statement,
	StockAvailabilityReport,
	Tender,
	TenderReceipt,
	TendererQualification,
	TendererQualificationResponse,
	TradeItemLocationProfile,
	TransportExecutionPlan,
	TransportExecutionPlanRequest,
	TransportProgressStatus,
	TransportProgressStatusRequest,
	TransportServiceDescription,
	TransportServiceDescriptionRequest,
	TransportationStatus,
	TransportationStatusRequest,
	UnawardedNotification,
	UtilityStatement,
	Waybill,
]);
