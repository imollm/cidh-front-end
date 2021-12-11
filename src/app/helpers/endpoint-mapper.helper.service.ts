import { isNil } from 'ramda';
import ApiEndpoints from '../api/endpoints.json';
import { sprintf } from 'sprintf-js';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class EndPointMapper {

  private readonly baseUrl: string;
  private readonly endpoints: {};

  constructor() {
    this.baseUrl = environment.apiUrl;
    this.endpoints = ApiEndpoints.endpoints;
  }

  getEndPointUrl(resource: string = '', action: string = '', id: string = ''): string {
    if (isNil(resource) && isNil(action)) {
      throw new Error('Resource and action can not be empty');
    }
    if (this.endpoints.hasOwnProperty(resource) && this.endpoints[resource].hasOwnProperty(action)) {
      let url = this.baseUrl.concat(this.endpoints[resource][action].uri);
      if (!isNil(id)) {
        url = sprintf(url, id);
      }
      return url;
    } else {
      throw new Error(sprintf('Endpoint have no resource or resource have no action, [%s - %s]', resource, action));
    }
  }
}
