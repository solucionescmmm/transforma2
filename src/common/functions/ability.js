import { defineAbility } from '@casl/ability';

export const defineAbilitiesFor = (strData) => {
    return defineAbility((can) => {
        if(strData) {
            console.log(strData)
            if (strData?.strRol === "Admin") {
                can("manage", "all");
            }
          
            if(strData?.strRol === "Interno") {
                can('create', 'Idea')
                can('search', 'Idea')
                can('update', 'Idea')
                // can('block', 'Idea')
          
                can('create', 'Empresarios')
                can('search', 'Empresarios')
                can('update', 'Empresarios')
                can('disabled', 'Empresarios')
                // can('block', 'Empresarios')
          
                can('create', 'Terceros')
                can('search', 'Terceros')
                can('update', 'Terceros')
                // can('block', 'Terceros')
          
                can('create', 'Eventos')
                can('search', 'Eventos')
                can('update', 'Eventos')
                can('delete', 'Eventos')
                // can('cancel', 'Eventos')
                can('enroll', 'Eventos')     
          
                can('create', 'Sesiones')
                can('search', 'Sesiones')
                can('update', 'Sesiones')
                can('delete', 'Sesiones')
                can('attendance', 'Sesiones')
          
                can('create', 'Tareas')
                can('search', 'Tareas')
                can('update', 'Tareas')
                can('delete', 'Tareas')
          
                can('create', 'Acomp')
                can('search', 'Acomp')
                can('update', 'Acomp')
                can('delete', 'Acomp')
          
                can('create', 'Rutas')
                can('search', 'Rutas')
                can('update', 'Rutas')
                can('delete', 'Rutas')
          
                can('create', 'Diag')
                can('search', 'Diag')
                can('update', 'Diag')
                can('delete', 'Diag')
          
                can('create', 'Docum')
                can('search', 'Docum')
                can('update', 'Docum')
                can('delete', 'Docum')
          
                // can('create', 'Maestros')
                can('search', 'Maestros')
                // can('update', 'Maestros')
                // can('delete', 'Maestros')
            }
          
            if(strData?.strRol === 'Externo') {
                can('search', 'Idea')
          
                can('search', 'Empresarios')
          
                can('search', 'Terceros')
          
                can('search', 'Eventos')
                can('update', 'Eventos')
                can('enroll', 'Eventos')
                
                can('create', 'Sesiones')
                can('search', 'Sesiones')
                can('update', 'Sesiones')
                can('attendance', 'Sesiones')
          
                can('create', 'Tareas')
                can('search', 'Tareas')
                can('update', 'Tareas')
          
                can('create', 'Acomp')
                can('search', 'Acomp')
                can('update', 'Acomp')
          
                can('create', 'Rutas')
                can('search', 'Rutas')
          
                can('create', 'Diag')
                can('search', 'Diag')
                can('update', 'Diag')
          
                can('create', 'Docum')
                can('search', 'Docum')
            }
        }
    })
};