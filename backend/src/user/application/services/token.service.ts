import type { IEnvironmentService } from "@keep/environment";
import { sign } from "jsonwebtoken";
import type { ITokenService } from "src/user/domain/services";

export class TokenServiceImpl implements ITokenService {
    constructor(private readonly environmentService: IEnvironmentService) {}

    public create(userId: number): string {
        const secretKey = this.environmentService.get("JWT_SECRET_KEY");
        const expiresIn = this.environmentService.get("JWT_EXPIRES_IN");

        return sign({ userId, timestamp: Date.now() }, secretKey, { expiresIn });
    }
}
