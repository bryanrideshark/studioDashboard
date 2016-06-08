import {StoreModel} from "../../../models/StoreModel";
import * as _ from "lodash";

/**
 * Thin wrapper of Immutable data around a single business
 * **/
export class OrderDetailModel extends StoreModel {

    constructor(data:any = {}) {
        super(data);
    }

    private fields = ['company', 'first_name', 'last_name', 'address1', 'address2', 'state', 'county', 'zip_code', 'phone1'];

    private getCustomerInfo(type) {
        var str:string = '';
        var data = this.getKey(type);
        this.fields.forEach((field)=> {
            if (data[field] && data[field].length > 0)
                str = str + data[field] + '\n';
        })
        return str;
    }

    public getBilling() {
        return this.getCustomerInfo('billing');
    }

    public getShipping() {
        return this.getCustomerInfo('shipping');
    }

    public getDate() {

    }
}


// switch ($row['status']) {
//     case NEW_ORDER:
//     {
//         $oData['textStatus'] = 'new order';
//         break;
//     }
//     case APPROVED:
//     {
//         $oData['textStatus'] = 'approved';
//         break;
//     }
//     case COMPLETED:
//     {
//         $oData['textStatus'] = 'completed';
//         break;
//     }
//     case ON_HOLD:
//     {
//         $oData['textStatus'] = 'on Hold';
//         break;
//     }
//     case PROCESSING:
//     {
//         if (strlen($oData['tracking']) > 3) {
//             $oData['textStatus'] = 'shipping';
//             break;
//         } else {
//             $oData['textStatus'] = 'processing';
//             break;
//         }
//     }
// }


// if ($globs['db_mediapay']->numRows() != 0) {
//     $i = 0;
//     while ($row = $globs['db_mediapay']->fetchArray()) {
//
//         $i++;
//         $price = is_numeric($row['product_price']) ? $row['product_price'] : 0;
//         $member = array();
//         $member['type'] = 'order';
//         $member['orderID'] = $orderID;
//         $member['paymentDate'] = $row['order_date'];
//         $member['description'] = $row['description'];
//         $member['amount'] = $price;
//         $member['transaction_id'] = "undefined";
//         $member['quantity'] = !is_numeric($row['product_count']) ? 1 : $row['product_count'];
//         $member['product_id'] = $row['product_id'];
//         $member['total'] = $row['product_count'] * $price;;
//
//         $oData['subtotal'] = $oData['subtotal'] + ($member['quantity'] * $member['amount']);
//         $jData['products' . $i] = $member;
//     }
//
//     $jData['order']['subtotal'] = $oData['subtotal'];
//     echo json_encode($jData);
//     msBye();
//
// }

// while ($row = $globs['db_mediapay']->fetchArray()) {
//
//     $member['type'] = 'subscribtion';
//     $member['orderID'] = $row['payment_id'];
//     $member['paymentDate'] = $row['payment_date'];
//     $member['description'] = $row['description'];
//     $member['amount'] = $row['amount'];
//     $member['transaction_id'] = $row['transaction_id'];
//     $member['quantity'] = "1";
//     $member['product_id'] = "MS-1";
//     $member['total'] = "$99.00";
//
//     $jData['products1'] = $member;
//
//
// }
// if ($globs['db_mediapay']->numRows() != 0) {
//     echo json_encode($jData);
//     msBye();
// }