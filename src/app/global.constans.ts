export class GlobalConstants {
  //Message

  public static genericError: string = 'Error inesperado , intentelo mas tarde';
  public static unauthorized: string = 'Usted no esta autorizado';
  //Regex

  public static nameRegex: string = '[a-zA-Z0-9]*';

  public static emailRegex: string =
    '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/';

  public static contactNumberRegex: string = '^[e0-9]{10,10}$';

  //Varible

  public static error: string = 'error';
}
