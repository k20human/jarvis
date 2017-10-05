import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(value:number):string {
    const bytes = value || 0,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        k = 1000,
        i = Math.floor(Math.log(bytes) / Math.log(k));

    if (bytes === 0) {
      return '0 Byte';
    }

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }

}
