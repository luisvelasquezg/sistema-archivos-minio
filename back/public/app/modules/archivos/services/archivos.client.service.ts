import * as angular from 'angular';
import 'angular-resource';

interface IArchivo extends ng.resource.IResource<IArchivo> {
  _id: string;
  // Agrega aquí las propiedades adicionales del archivo según tu modelo
}

interface IArchivoResource extends ng.resource.IResourceClass<IArchivo> {
  update(params: object, body: IArchivo): IArchivo;
}

ArchivoService.$inject = ['$resource'];
function ArchivoService($resource: ng.resource.IResourceService): IArchivoResource {
  return $resource<IArchivo, IArchivoResource>('api/archivos/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}

angular.module('archivos').factory('ArchivoService', ArchivoService);
