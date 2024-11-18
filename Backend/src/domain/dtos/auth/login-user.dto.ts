

export class LoginUserDto {

    constructor(
        public correo: string,
        public contrasena: string
    ) { }

    static create(props: { [key: string]: any }): [string?, LoginUserDto?] {
        const { correo, contrasena } = props;

        if (!correo) return ['Missing email'];
        if (!contrasena) return ['Missing password'];

        return [undefined, new LoginUserDto(correo, contrasena)];

    }
}