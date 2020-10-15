import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { DishesComponent } from "app/components/dishes/dishes.component";
import { ResturantsComponent } from "app/components/resturants/resturants.component";
import { ChefsComponent } from "app/components/chefs/chefs.component";
import { LoginComponent } from "app/components/login/login.component";

export const AdminLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "table-list", component: TableListComponent },
  { path: "dishes", component: DishesComponent },
  { path: "resturants", component: ResturantsComponent },
  { path: "chefs", component: ChefsComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
];
