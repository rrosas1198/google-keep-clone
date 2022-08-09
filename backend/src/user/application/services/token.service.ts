import { Injectable } from "@keep/common";
import { ConfigService } from "@keep/config";
import { sign } from "jsonwebtoken";

@Injectable()
export class TokenService {
    constructor(private readonly configService: ConfigService) {}

    public create(userId: number) {
        const secretKey = this.configService.get<string>("JWT_SECRET_KEY");
        const expiresIn = this.configService.get<string>("JWT_EXPIRES_IN");

        return sign({ userId, timestamp: Date.now() }, secretKey, { expiresIn });
    }
}
