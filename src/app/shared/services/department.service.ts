import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()
export class DepartmentService {
  constructor(public http: HttpService) { }
  /**
  *  查询
 */

  public getAll(params): Promise<any> {
    return this.http.get('department/getAll', params);
  }

  /**
   * 创建
   */
  public createDepartment(params): Promise<any> {
    return this.http.post('department/addDepartment ', params);
  }

  /**
  * 修改
  */
  public updateDepartment(params): Promise<any> {
    return this.http.post('department/updateDepartment ', params);
  }
  /**
    * 修改
    */
  public deleteDepartment(params): Promise<any> {
    return this.http.post('department/deleteDepartment ', params);
  }
  /**
   * 查询详细
   */
  public getDetail(params) {
    return this.http.post('department/getById ', params);
  }

  /**
   * 激活、非激活
   */
  public artiveDepartment(params) {
    return this.http.post('department/activeDepartment ', params);
  }
}
