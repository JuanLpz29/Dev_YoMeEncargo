import { Request, Response } from 'express';
import path from 'path';

export class FilesController {

  //* DI
  constructor() { }

  public getCertificado = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '../../../uploads/certificados', req.params.filename);
    
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).json({ error: 'Certificado no encontrado' });
      }
    });
  };

  public getFoto = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '../../../uploads/fotos', req.params.filename);
    
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).json({ error: 'Foto no encontrada' });
      }
    });
  };

}