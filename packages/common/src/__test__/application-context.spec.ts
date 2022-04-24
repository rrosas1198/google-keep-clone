import "@abraham/reflection";
import { ApplicationContext } from "src/application-context";
import { describe, expect, it } from "vitest";
import { Injectable, Module } from "../decorators";

describe("application context", () => {
    it("should register the module", async () => {
        @Injectable()
        class AppService {}

        @Module({
            providers: [AppService]
        })
        class AppModule {}

        const applicationContext = new ApplicationContext();
        applicationContext.registerModule(AppModule);

        const appService = applicationContext.resolve(AppService);
        expect(appService instanceof AppService).toBe(true);
    });

    it("should resolve the provider", async () => {
        @Injectable()
        class AppService {}

        const applicationContext = new ApplicationContext();
        applicationContext.register(AppService);

        const appService = applicationContext.resolve(AppService);
        expect(appService instanceof AppService).toBe(true);
    });

    it("should resolve deep providers", async () => {
        @Injectable()
        class FooService {}

        @Injectable()
        class BarService {}

        @Module({
            providers: [FooService]
        })
        class FooModule {}

        @Module({
            imports: [FooModule],
            providers: [BarService]
        })
        class BarModule {}

        @Module({
            imports: [BarModule],
            providers: [BarService]
        })
        class AppModule {}

        const applicationContext = new ApplicationContext();
        applicationContext.registerModule(AppModule);

        const fooService = applicationContext.resolve(FooService);
        expect(fooService instanceof FooService).toBe(true);
    });
});
