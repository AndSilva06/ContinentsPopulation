export type ContinentData = {
    label: string;
    data: [];
}

export type GroupContinentData = {
    [key:string]: ContinentData;
}

export type Population = {
    label: string;
    data: number
}