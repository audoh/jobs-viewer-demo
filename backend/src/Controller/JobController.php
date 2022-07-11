<?php

namespace App\Controller;

use App\Entity\Job;
use App\Entity\JobStatus;
use App\Form\JobType;
use App\Utils\ExceptionUtils;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

use Doctrine\Persistence\ManagerRegistry;

class JobController extends AbstractController
{
    #[Route('/jobs', name: 'create_job', methods: ['POST'], format: 'json')]
    public function createJob(Request $request, ManagerRegistry $doctrine): JsonResponse
    {   
        $job = new Job();

        $form = $this->createForm(JobType::class, $job);
        $data = json_decode($request->getContent(), true);
        $data['status'] = JobStatus::OPEN;
        $form->submit($data);

        if (!$form->isValid()) 
        {
            $errorDetails = ExceptionUtils::getFormErrorDetails($form);
            return $this->json(ExceptionUtils::formatError(errorCode: 'form-invalid', errorDetails: $errorDetails), status: 422);
        }
        
        $entityManager = $doctrine->getManager();
        $entityManager->persist($job);
        $entityManager->flush();

        return $this->json([
            'id' => $job->getId(),
            'summary' => $job->getSummary(),
            'description' => $job->getDescription(),
            'status' => $job->getStatus()->value,
            'property' => $job->getProperty()->getId()
        ]);
    }

    #[Route('/jobs', name: 'list_jobs', methods: ['GET'], format: 'json')]
    public function listJobs(ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $results = [];
        foreach ($entityManager->getRepository(Job::class)->findAll() as $job)
        {
            array_push($results, [
                'id' => $job->getId(),
                'summary' => $job->getSummary(),
                'status' => $job->getStatus()->value,
                'property' => [
                    'id' => $job->getProperty()->getId(),
                    'name' => $job->getProperty()->getName()
                ]
            ]);
        }

        return $this->json($results);
    }
}
