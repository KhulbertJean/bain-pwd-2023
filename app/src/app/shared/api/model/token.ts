import {IsEmpty} from '../../core/model/type';

export interface Token extends IsEmpty{
  token: string;
  refreshToken: string;
}
