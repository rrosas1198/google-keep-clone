import { IConfigService } from "@keep/config";
import { sign } from "jsonwebtoken";
import { ITokenService } from "src/user/domain/services";

export class TokenServiceImpl implements ITokenService {
    constructor(private readonly configService: IConfigService) {}

    public create(userId: number): string {
        const secretKey = this.configService.get("JWT_SECRET_KEY");
        const expiresIn = this.configService.get("JWT_EXPIRES_IN");

        return sign({ userId, timestamp: Date.now() }, secretKey, { expiresIn });
    }
}
