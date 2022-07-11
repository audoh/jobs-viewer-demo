<?php

namespace App\Utils;

use Symfony\Component\Form\Form;

class ExceptionUtils
{
    public static function formatError(string $errorCode, array $errorDetails): array
    {
        return [
            'errorCode'=> $errorCode,
            'errorDetails'=> $errorDetails
        ];
    }

    public static function getFormErrorDetails(Form $form): array
    {
        $errorDetails = [];
        foreach ($form->getErrors() as $key => $error) 
        {
            array_push($errorDetails, ['field' => NULL, 'message' => $error ]);
        }
        foreach ($form->all() as $child)
        {
            if (!$child->isValid())
            {
                foreach ($child->getErrors() as $key => $error)
                {
                    array_push($errorDetails, [ 'field' => $child->getName(), 'message' => (string) $error->getMessage() ]);
                }
            }
        }
        return $errorDetails;
    }
}