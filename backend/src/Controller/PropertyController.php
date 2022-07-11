<?php

namespace App\Controller;
use App\Entity\Property;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Doctrine\Persistence\ManagerRegistry;

class PropertyController extends AbstractController
{
    #[Route('/properties', name: 'list_properties', methods: ['GET'], format: 'json')]
    public function listProperties(ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $results = [];
        foreach ($entityManager->getRepository(Property::class)->findAll() as $property)
        {
            array_push($results, [
                'id' => $property->getId(),
                'name' => $property->getName(),
            ]);
        }

        return $this->json($results);
    }
}
