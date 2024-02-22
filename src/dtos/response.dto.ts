export class ResponseDTO{
  status:'success' | 'failure';
  data:any
  errorMsg?:string;
  constructor(status:'success' | 'failure', data?:any, errorMsg?: string){
    this.status = status;
    if(status === "success"){
      this.data = data;
    }
    else{
      this.data = null
    }
    if(status === 'failure'){
      this.errorMsg = errorMsg ?? 'Unable to fetch';
    }
  }
}