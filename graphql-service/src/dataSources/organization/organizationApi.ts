import { RESTDataSource } from "@apollo/datasource-rest";
import { SERVER_URL } from "../../utils/consts";
import { IResponse } from "../../utils/interfaces/common";

export default class OrganizationApi extends RESTDataSource {
  override baseURL = SERVER_URL.USER_SERVICE;
  private user: object | null;

  constructor(user: object | null) {
    super();
    this.user = user;
  }

  async register(doc: object): Promise<IResponse> {
    return await this.post(`organization/register`, {
      body: { doc, user: this.user },
    });
  }

  async getList(doc: object): Promise<IResponse> {
    return await this.post(`organization/list`, {
      body: { doc, user: this.user },
    });
  }
}