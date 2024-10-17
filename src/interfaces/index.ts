export interface INavLink{
    id:number,
    link:string,
    text:string
}

export interface INewsApi{
    id:number,
    title:string,
    description:string,
    photos:string[],
    activity_date?:string,
    service_category_id?:string,
    activity_type_id?:number,
    created_at?:string,
    decision_id?:number,
    activity_type_name?:string,
    decision_date?:string,
}

export interface ITabs{
    id?:number,
    name:string
}

export interface INews{
    id?:number,
    title:string,
    description:string,
    photos:string[] | File[],
    _method?:string,
}

export interface IServices{
    id?:number,
    title:string,
    description:string,
    service_category_id:string,
    _method?:string,
}

export interface IEvents{
    id?:number,
    title:string,
    description:string,
    activity_type_id:number,
    activity_date?:string,
    photos:string[] | File[],
    _method?:string,
}

export enum Status {
    Trash = "trash",
    InProgress = "in progress",
    Resolved = "resolved",
    Unresolved = "unresolved",
  }
export interface IComplaints{
    id?: number,
      name: string,
      number: string,
      description: string,
      status: Status,
      photos: string[],
      created_at:string,
    _method?:string,
}

export interface IDecisions{
   id?: number,
      decision_id: number,
      decision_date: string,
      title: string,
      description: string,
      photos:string[] | File[],
    _method?:string,
}

export interface IMembers{
    id?: number,
      name: string,
      job_title: string,
      description: string,
      photo: string | File,
    _method?:string,
}
