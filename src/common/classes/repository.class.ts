export abstract class Repository<T> {
  abstract create(dto: any): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: string): Promise<T | null>;
  abstract update(id: string, dto: any): Promise<T | null>;
  abstract replace(id: string, dto: any): Promise<T | null>;
  abstract delete(id: string): Promise<T | null>;
}
