import { compareSync } from "bcryptjs";
import { IHashService } from "src/user/domain/services";

export class HashServiceImpl implements IHashService {
    public compare(value: string, hash: string): boolean {
        try {
            return compareSync(value, hash);
        } catch {
            return false;
        }
    }
}
