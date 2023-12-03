import admin, { ServiceAccount } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "./rrhh-management-devaaf-firebase-adminsdk-qe3t1-796e76a4b6.json";

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const auth = getAuth(firebaseApp);
