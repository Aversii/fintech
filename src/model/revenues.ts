export class Revenues {
    constructor(
      private id: string,
      private value: number,
      private userId: string,
      private createdAt: number = Date.now()
    ) {}
  
    getId(): string {
      return this.id;
    }
  
    getValue(): number {
      return this.value;
    }
  
    getUserId(): string {
      return this.userId;
    }
  
    getCreatedAt(): number {
      return this.createdAt;
    }
}
  
