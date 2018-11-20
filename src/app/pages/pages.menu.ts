//-----
export const PAGES_MENU = [{
  path: 'pages',
  children: [
    {
    path: 'dashboard',
    data: {
      menu: {
        _id: 'dashboard',
        title: 'pages.dashboard.dashboard',
        icon: 'motum-i tm-e928',
        selected: false,
        expanded: false,
        order: 60
      }
    }
  },
  {
    path: 'monitoring-and-reaction',
    data: {
      menu: {
        _id: 'monitoringAndReaction',
        title: 'pages.dashboard.monitoringandreaction',
        icon: 'motum-i tm-e929',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            _id: 'monitoringAndReaction',
            label : 'Mapa',
            icon: 'motum-i tm-e9bb',
            colorHover: '#3ddbf3',
            url: '/pages/monitoring-and-reaction'
          },
          {
            _id: 'monitoringAndReaction',
            label : 'Seguridad patrimonial',
            icon: 'motum-i tm-e9bc',
            colorHover: '#3b3b3a',
            url: 'monitoring-and-reaction/patrimonial-security'
          },
          {
            _id: 'monitoringAndReaction',
            label : 'TEA',
            icon: 'motum-i tm-e923',
            colorHover: '#2cdbbd',
            url: '/pages/monitoring-and-reaction'
          },
          {
            _id: 'monitoringAndReaction',
            label : 'Panel de incidencias',
            icon: 'motum-i tm-e9bd',
            colorHover: '#ea6e4e',
            url: '/pages/monitoring-and-reaction'
          },
          {
            _id: 'monitoringAndReaction',
            label : 'Alertas',
            icon: 'motum-i tm-e9be',
            colorHover: '#dd4599',
            url: '/pages/monitoring-and-reaction'
          }
        ]
      }
    }
  },
  {
    path: 't',
    data: {
      menu: {
        _id: 'activities',
        title: 'pages.dashboard.activity',
        icon: 'motum-i tm-e92a',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            id: 'activities',
            label: 'Histórico por viajes',
            icon: 'motum-i tm-e923',
            colorHover: '#006DFB',
            url: ''
          },
          {
            id: 'activities',
            label: 'Histórico por posición',
            icon: 'motum-i tm-e923',
            colorHover: '#006DFB',
            url: ''
          },
          {
            id: 'activities',
            label: 'Indicadores de desempeño',
            icon: 'motum-i tm-e923',
            colorHover: '#006DFB',
            url: ''
          },
          {
            id: 'activities',
            label: 'Ruta recorrida',
            icon: 'motum-i tm-e9bf',
            colorHover: '#006DFB',
            url: ''
          },
          {
            id: 'activities',
            label: 'Histórico de viajes por operador',
            icon: 'motum-i tm-e923',
            colorHover: '#006DFB',
            url: ''
          }
        ]
      }
    }
  },
  {
    path: 'travel_matrix',
    data: {
      menu: {
        _id: 'travelMatrix',
        title: 'pages.dashboard.logistics',
        icon: 'motum-i tm-e9b2',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            _id: 'travel_matrix',
            label : 'Despacho',
            icon: 'motum-i tm-e9c0',
            colorHover: '#006DFB',
            url: '/pages/travel_matrix/clients-products'
          },
          {
            _id: 'travel_matrix',
            label : 'Círculo de servicio',
            icon: 'motum-i tm-e918',
            colorHover: '#006DFB',
            url: ''
          },
          {
            _id: 'travel_matrix',
            label : 'Estancias',
            icon: 'motum-i tm-e9c2',
            colorHover: '#006DFB',
            url: ''
          },
          {
            _id: 'travel_matrix',
            label : 'Cadena de frío',
            icon: 'motum-i tm-e9c3',
            colorHover: '#006DFB',
            url: ''
          },
          {
            _id: 'travel_matrix',
            label : 'HOS',
            icon: 'motum-i tm-e936',
            colorHover: '#006DFB',
            url: ''
          },
          {
            _id: 'travel_matrix',
            label : 'DVIR',
            icon: 'motum-i tm-e94d',
            colorHover: '#006DFB',
            url: ''
          },
          {
            _id: 'travel_matrix',
            label : 'Acceso a clientes',
            icon: 'motum-i tm-e9c6',
            colorHover: '#006DFB',
            url: ''
          }
        ]
      }
    }
  },
  {
    path: 't',
    data: {
      menu: {
        _id: 'message',
        title: 'pages.dashboard.menssage',
        icon: 'motum-i tm-e9b3',
        selected: false,
        expanded: false,
        order: 80
      }
    }
  },
  {
    path: 'ranking',
    data: {
      menu: {
        _id: 'ranking',
        title: 'pages.dashboard.ranking',
        icon: 'motum-i tm-e9b4',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            _id: 'ranking',
            label : 'Usuario',
            icon: 'motum-i tm-e9c7',
            colorHover: '#F4AD34',
            url: '/pages/ranking/users'
          },
          {
            _id: 'ranking',
            label : 'Operadores',
            icon: 'motum-i tm-e9c8',
            colorHover: '#F45A2A',
            url: '/pages/ranking/drivers'
          },
          {
            _id: 'ranking',
            label : 'Desempeño vehícular',
            icon: 'motum-i tm-e9c9',
            colorHover: '#F13856',
            url: '/pages/ranking/vehicle-performance'
          },
          {
            _id: 'ranking',
            label : 'Configuración',
            icon: 'motum-i tm-e9ca',
            colorHover: '#006DFB',
            url: ''
          }
        ]
      }
    }
  },
  {
    path: 'maintenance',
    data: {
      menu: {
        _id: 'maintenance',
        title: 'pages.dashboard.maintenance',
        icon: 'motum-i tm-e9b5',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            // _id: 'maintenance',
            label : 'Solicitudes de mantenimiento',
            icon: 'motum-i tm-e9b6',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'maintenance',
            label : 'Ordenes',
            icon: 'motum-i tm-e9cc',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'maintenance',
            label : 'Captura manual de datos de telemática',
            icon: 'motum-i tm-e9cd',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'maintenance',
            label : 'Salud de flota',
            icon: 'motum-i tm-e9ce',
            colorHover: '#006DFB',
            url: '/pages/maintenance/fleet-healt'
          },
          {
            // _id: 'maintenance',
            label : 'Salud de flota por componente',
            icon: 'motum-i tm-e9cf',
            colorHover: '#006DFB',
            url: '/pages/maintenance/fleet-healt-by-component'
          },
          {
            // _id: 'maintenance',
            label : 'Salud de flota por vehículo',
            icon: 'motum-i tm-e9d0',
            colorHover: '#006DFB',
            url: '/pages/maintenance/fleet-healt-vehicle'
          },
          {
            // _id: 'maintenance',
            label : 'Códigos de falla',
            icon: 'motum-i tm-e923',
            colorHover: '#006DFB',
            url: '/pages/maintenance/fault-codes'
          },
          {
            // _id: 'maintenance',
            label : 'Snapshots',
            icon: 'motum-i tm-e9d1',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'maintenance',
            label : 'Configuración detallada de vehículos',
            icon: 'motum-i tm-e9d2',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'maintenance',
            label : 'Catálogos',
            icon: 'motum-i tm-e9d3',
            colorHover: '#006DFB',
            url: ''
          }
        ]
      }
    }
  },
  {
    path: 'reports',
    data: {
      menu: {
        _id: 'reports',
        title: 'pages.dashboard.reports',
        icon: 'motum-i tm-e9cb',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            label : 'Vehículos',
            icon: 'motum-i tm-e9d4',
            colorHover: '#006DFB',
            url: '/pages/reports'
          },
          {
            label : 'Operadores',
            icon: 'motum-i tm-e9d5',
            colorHover: '#006DFB',
            url: '/pages/reports'
          },
          {
            label : 'Grupos',
            icon: 'motum-i tm-e9d5',
            colorHover: '#006DFB',
            url: '/pages/reports'
          }
        ]
      }
    }
  },
  {
    path: 't',
    data: {
      menu: {
        _id: 'geoSmart',
        title: 'pages.dashboard.geoSmart',
        icon: 'motum-i tm-e9b7',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            // _id: 'travel_matrix',
            label : 'Rutas',
            icon: 'motum-i tm-e9d7',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Puntos de interés',
            icon: 'motum-i tm-e9d8',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Territorios',
            icon: 'motum-i tm-e9d9',
            colorHover: '#006DFB',
            url: ''
          }
        ]
      }
    }
  },
  {
    path: 'vehicles',
    data: {
      menu: {
        _id: 'vehicles',
        title: 'pages.dashboard.units',
        icon: 'motum-i tm-e945',
        selected: false,
        expanded: false,
        order: 70,
        applications: [
          {
            _id: 'vehicles',
            label : 'Grupos',
            icon: 'motum-i tm-e945',
            colorHover: '#006DFB',
            url: '/pages/vehicles/groups'
          },
          {
            _id: 'vehicles',
            label : 'Grupos y vehículos',
            icon: 'motum-i tm-e923',
            colorHover: '#006DFB',
            url: '/pages/vehicles/groups'
          },
          {
            // _id: 'travel_matrix',
            label : 'Editar vehículos',
            icon: 'motum-i tm-e9db',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Configuración de dispositivos',
            icon: 'motum-i tm-e923',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Configuración de telemática',
            icon: 'motum-i tm-e9dc',
            colorHover: '#006DFB',
            url: ''
          }
        ]
      }
    }
  },
  {
    path: 't',
    data: {
      menu: {
        _id: 'operators',
        title: 'pages.dashboard.operators',
        icon: 'motum-i tm-e9b9',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            // _id: 'travel_matrix',
            label : 'Alta de operadores',
            icon: 'motum-i tm-e9dd',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Asignar vehículos',
            icon: 'motum-i tm-e9de',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Configuración de ID button',
            icon: 'motum-i tm-e9df',
            colorHover: '#006DFB',
            url: ''
          }
        ]
      }
    }
  },
  {
    path: 't',
    data: {
      menu: {
        _id: 'networkLink',
        title: 'pages.dashboard.networklink',
        icon: 'motum-i tm-e92b',
        selected: false,
        expanded: false,
        order: 80,
        applications: [
          {
            // _id: 'travel_matrix',
            label : 'Auxilio carretero',
            icon: 'motum-i tm-e923',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Service locator',
            icon: 'motum-i tm-e9e0',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Solicitudes de auxilio carretero',
            icon: 'motum-i tm-e9cb',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Mis ubicaciones',
            icon: 'motum-i tm-e9e2',
            colorHover: '#006DFB',
            url: ''
          },
          {
            // _id: 'travel_matrix',
            label : 'Mis grupos',
            icon: 'motum-i tm-e9e1',
            colorHover: '#006DFB',
            url: ''
          }
        ]
      }
    }
  },
  {
    path: 'usersControl',
    data: {
      menu: {
        _id: 'usersControl',
        title: 'pages.dashboard.administrationpanel',
        icon: 'motum-i tm-e9ba',
        selected: false,
        expanded: false,
        order: 50,
        applications: [
          {
            _id: 'usersControl',
            label : 'Usuarios',
            icon: 'motum-i tm-e93c',
            colorHover: '#1CB6F1',
            url: '/pages/usersControl/users'
          },
          {
            _id: 'usersControl',
            label : 'Clientes',
            icon: 'motum-i tm-e9e4',
            colorHover: '#6563FF',
            url: '/pages/usersControl/clients-products'
          },
          {
            _id: 'usersControl',
            label : 'Pedidos',
            icon: 'motum-i tm-e9e5',
            colorHover: '#01B7FF',
            url: '/pages/usersControl/client-orders'
          },
          {
            _id: 'usersControl',
            label : 'Operadores',
            icon: 'motum-i tm-e903',
            colorHover: 'black',
            url: '/pages/usersControl/clients-products'
          },
          {
            _id: 'usersControl',
            label : 'Grupos',
            icon: 'motum-i tm-e9e6',
            colorHover: '#c679ef',
            url: ''
          },
          {
            _id: 'usersControl',
            label : 'Accesos',
            icon: 'motum-i tm-e937',
            colorHover: '#68EAA1',
            url: ''
          }
        ]
      }
    }
  }
]
}];
