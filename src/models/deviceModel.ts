export interface DeviceInfo {
    id: number;
    title: string;
    description: string;
    deviceId: number;
}

export interface DeviceModel {
    id: number;
    model: string;
    image: string;
    rating: number;
    price: number;
    brandId: number;
    typeId: number;
    info: DeviceInfo[];

}

export interface Device {
    count: number;
    rows: DeviceModel[];
}
