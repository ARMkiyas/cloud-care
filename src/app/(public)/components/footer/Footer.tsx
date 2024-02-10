"use client";
import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Flex,
  Input,
  CloseButton,
  Button,
  Box,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconChevronRight,
  IconArrowRight,
  IconMapPin,
  IconPhone,
  IconClock,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import classes from "./FooterLinks.module.css";
import { useState } from "react";

const data = [
  {
    title: "Services",
    links: [
      { label: "Cardiology", link: "#" },
      { label: "Pulmonary", link: "#" },
      { label: "Neurology", link: "#" },
      { label: "Orthopedics", link: "#" },
      { label: "Laboratory", link: "#" },
    ],
  },
  {
    title: "Quick links",
    links: [
      { label: "About Us", link: "/about" },
      { label: "Contact Us", link: "/contact" },
      { label: "Our Doctors", link: "/doctors" },
      { label: "Book Appointment", link: "/appointment/book" },
      { label: "Check  Appointment", link: "/appointment/check" },
      { label: "Support", link: "/contact" },
    ],
  },
];

export default function Footer() {
  const [value, setValue] = useState("");

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<typeof Link>
        key={index}
        className={classes.link}
        component={Link}
        href={link.link}
      >
        <Flex align="center" gap={3}>
          <IconChevronRight size={12} />
          {link.label}
        </Flex>
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  const signupnewsletterBtn = <Button>Signup</Button>;

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text size="xl" className={classes.title}>
            Address
          </Text>

          <Flex
            direction={"column"}
            justify={"center"}
            gap={7}
            className="pt-3"
          >
            <Flex align={"center"} gap="7px">
              <IconMapPin size="0.9rem" color="#ffffff" />
              <Text c="dimmed" className="flex items-center" size="sm">
                123 Street, abc, Sri Lanka
              </Text>
            </Flex>
            <Flex align={"center"} gap="7px">
              <IconPhone size="0.9rem" color="#ffffff" />
              <Text c="dimmed" className="flex items-center" size="sm">
                +9412 345 6789
              </Text>
            </Flex>
            <Flex align={"center"} gap="7px">
              <IconMail size="0.9rem" color="#ffffff" />
              <Text c="dimmed" className="flex items-center" size="sm">
                admin@cloudcare.com
              </Text>
            </Flex>
          </Flex>
        </div>
        <div className={classes.groups}>{groups}</div>
        <Box>
          <Text className={classes.title}>Newsletter</Text>
          <Text size="sm" c="dimmed">
            Subscribe to our newsletter to get our latest news
          </Text>
          <Input
            placeholder="Your email"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            mt="md"
            rightSection={
              <ActionIcon size={32} radius="xl" variant="filled">
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
          />
        </Box>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          ©CloudCare. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <Text c="dimmed" size="sm">
            Designed and Developed By Team Elites in RUSL
          </Text>

          {/* <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon> */}
        </Group>
      </Container>
    </footer>
  );
}
