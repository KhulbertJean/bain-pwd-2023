import { ApiCodeResponse } from './api-code.response';

export interface ApiResponse {
    result:boolean; //true
  code: ApiCodeResponse; //STOCK_DETAIL_SUCCESS
    data: any; //les détails du stock demandé
}