export abstract class EmbalseService {
  abstract create(...args: any[]): any;
  abstract findAll(): any;
  abstract findOne(id: string): any;
  abstract update(id: string, dto: any): any;
  abstract replace(id: string, dto: any): any;
  abstract delete(id: string): any;
}
