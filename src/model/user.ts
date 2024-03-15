export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private balance: number,
    private role: "NORMAL" | "ADMIN" = "NORMAL",
    private createdAt: number = Date.now()
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getBalance(): number {
    return this.balance;
  }

  setBalance(newBalance: number): void {
    this.balance = newBalance;
  }

  getRole(): "NORMAL" | "ADMIN" {
    return this.role;
  }

  setRole(newRole: "NORMAL" | "ADMIN"): void {
    this.role = newRole;
  }

  getCreatedAt(): number {
    return this.createdAt;
  }
}