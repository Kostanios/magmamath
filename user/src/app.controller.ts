import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/health')
    public getHealthCheck() {
        return { ok: true };
    }
}
