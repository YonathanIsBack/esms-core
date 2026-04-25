import dayjs from "dayjs";
import CurrencyUtil from "./CurrencyUtil";

export default class PlainInvoiceUtil {
    static buildPlainInvoice(transaction) {
        return `${this.getHeader()}\n\n${this.getCustomerName(transaction.customer.customerName)}\n\n${this.getTransactionDate(transaction.transactionDate)}\n\n${this.getTransactionUid(transaction.transactionCode)}\n\n${transaction.serviceTransactionDtls.map((serviceTransactionDtl) => this.getTransactionDetail(serviceTransactionDtl))}\n\n-------------------\nTotal:\n${CurrencyUtil.formatCurrency(transaction.serviceTransactionDtls.reduce(
            (tempSum, serviceTransactionDtl) =>
              serviceTransactionDtl.price + tempSum,
            0,
          ))}\n\nThank you for using our services\nBest Regards\n\n\n\nSigned Here\nYonathan`
    }

    static getHeader() {
        return `Yonathan Co.`
    }

    static getCustomerName(customerName) {
        return `Customer Name:\n${customerName}`;
    }

    static getTransactionDate(transactionDate) {
        return `Transaction Date:\n${dayjs(transactionDate).format('DD-MM-YYYY')}`;
    }

    static getTransactionUid(uid) {
        return `Transaction UID:\n${uid}`;
    }

    static getTransactionDetail(transactionDetail) {
        return `1x\n${transactionDetail.itemName}\n${transactionDetail.solution}\nPrice: ${CurrencyUtil.formatCurrency(transactionDetail.price)}`;
    }
};
