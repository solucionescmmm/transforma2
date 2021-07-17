import { AbilityBuilder } from "@casl/ability";

export default function defineRulesFor(roles, app) {
    const { can, rules } = new AbilityBuilder();

    if (app === "Novedades") {
        rulesAsignacion(can, roles);
    }

    return rules;
}

const rulesAsignacion = (can, roles) => {
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            let rol = roles[i].strNombre;

            switch (rol) {
                case "ADMINISTRADOR":
                    can("view", "all");

                    break;

                case "Lider":
                    break;

                default:
                    can("view", "Mod_Solicitudes");
                    can("view", "Mod_MisSolicitudes");

                    break;
            }
        }
    } else {
        can("view", "Mod_MisTareas");
    }
};
