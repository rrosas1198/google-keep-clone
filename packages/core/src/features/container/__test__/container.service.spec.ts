/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { ContainerService } from "../container.service";
import { ContainerDecorator } from "../utils";

const IService1 = ContainerDecorator<IService1>("IService1");

interface IService1 {
    value: string;
}

class Service1 implements IService1 {
    public readonly value = "Service1";
}

const IService2 = ContainerDecorator<IService2>("IService2");

interface IService2 {
    value: string;
}

class Service1Consumer {
    constructor(@IService1 public readonly service1: IService1) {}
}

class TargetWithStaticParam {
    constructor(public readonly v: boolean, @IService1 public readonly service1: IService1) {}
}

describe("Dependency Service", () => {
    it("Cannot overwrite dependency", () => {
        let result = ContainerService.add({ provide: IService1, useClass: Service1 });
        expect(result).toBeInstanceOf(Service1);
        result = ContainerService.add({ provide: IService1, useValue: null }) as any;
        expect(result).toBeInstanceOf(Service1);
    });

    it("Dependency registry, add/has", () => {
        ContainerService.add({ provide: IService1, useClass: Service1 });

        expect(ContainerService.has(IService1)).toBeTruthy();
        expect(ContainerService.has(IService2)).toBeFalsy();
    });

    it("@Param - simple class", () => {
        ContainerService.add({ provide: IService1, useClass: Service1 });

        const service1Consumer = ContainerService.create(Service1Consumer);
        expect(service1Consumer.service1).toBeDefined();
        expect(service1Consumer.service1.value).toBe("Service1");
    });

    it("@Param - fixed params", () => {
        ContainerService.add({ provide: IService1, useClass: Service1 });

        const targetWithStaticParam = ContainerService.create(TargetWithStaticParam, true);
        expect(targetWithStaticParam.v).toBeTruthy();
        expect(targetWithStaticParam.service1).toBeDefined();
        expect(targetWithStaticParam.service1.value).toBe("Service1");
    });
});
