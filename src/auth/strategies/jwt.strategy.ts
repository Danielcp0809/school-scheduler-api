import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import config from "src/config/config";
import { TokenPayload } from "../interfaces/token.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>
    ) {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwt_secret,
        });
    }

    validate(payload: TokenPayload){
        // We could do some extra validation here, like checking if the user is still active or if the user has the correct permissions
        return payload;
    }

}