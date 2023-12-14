import { PrismaClient } from "@prisma/client";





const db = new PrismaClient();


const user = {

}

async function main() {

    await db.userRole.createMany({
        data: [
            {
                role: "GUEST"
            },
            {
                role: "ROOTUSER"
            },
            {
                role: "ADMIN"
            },
            {
                role: "DOCTOR"
            },
            {
                role: "NURSE"
            },
        ]
    })


    await db.$transaction(async (tx) => {


        const staff = await tx.staff.create({
            data: {
                firstName: "Mohammed",
                lastName: "kiyas",
                email: "armkiyas99@gmail.com",
                dateOfBirth: new Date(1999, 8, 1),
                phone: "+94721777777",
                gender: "male",

            },
        });

        const user = await tx.user.create({
            data: {
                email: staff.email,
                password: "$argon2id$v=19$m=12288,t=3,p=1$dsA6tq6wdYyP+/qMvH6mpA$APo3OLQ5r//LW49eXS++z9FmS7Mryx2FizzsmeVeHMo",
                name: `${staff.title}.${staff.firstName} ${staff.lastName}`,
                username: "armkiyas",
                twoFactorSecret: "DYVUEDDFCJ5SQOYS",
                staff: {
                    connect: {
                        id: staff.id,
                    },
                },
                role: {
                    connect: {
                        role: "ROOTUSER"
                    }
                }
            }
        })

    });


}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await db.$disconnect();
    });
