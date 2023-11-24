import { cache } from "react";
import prisma from "@/app/db";
import { Country, Region } from "@prisma/client";
export const revalidate = 3600;

export interface RegionWithCounts extends Region {
  _count: {
    cities: number;
  };
}

export interface CountryWithCounts extends Country {
  regions: RegionWithCounts[];
}

export const fetchCountry = cache(
  async (countrySlug: string): Promise<CountryWithCounts | null> => {
    const country = await prisma.country.findFirst({
      where: {
        name_slug: countrySlug,
      },
      include: {
        regions: {
          select: {
            name: true,
            name_slug: true,
            _count: {
              select: { cities: true },
            },
          },
        },
      },
    });

    if (!country) {
      return null;
    }

    return country as CountryWithCounts;
  }
);
