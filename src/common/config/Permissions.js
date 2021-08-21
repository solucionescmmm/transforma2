import { AbilityBuilder } from "@casl/ability";

export default function defineRulesFor(roles, app) {
    const { can, rules } = new AbilityBuilder();

    if (app === "TRANSFORMA") {
        rulesTransforma(can, roles);
    }

    return rules;
}

const rulesTransforma = (can, roles) => {
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            let rol = roles[i].strNombre;

            switch (rol) {
                case "ADMINISTRADOR":
                    can("view", "all");

                    break;

                default:
                    break;
            }
        }
    }
};
