<?php

namespace Src\ddd\community;


use Src\core\http\Exception\HttpException;

class CommunityService
{
    private $communityRepository;

    /**
     * @param $userRepository
     */
    public function __construct($db)
    {
        $this->communityRepository = new CommunityRepository($db);
    }

    public function getReviewsByProduct($productId, $page, $size, $orderBy)
    {
        $result = array();
        $result["items"] = $this->communityRepository->getReviewsByProduct($productId, $page, $size, $orderBy);
        $result["total"] = $this->communityRepository->countReview($productId);
        return $result;
    }
    public function getReviews($page, $size, $orderBy)
    {
        return $this->communityRepository->getReviews($page, $size, $orderBy);
    }

    public function insertReview($comment)
    {
        try {

            return $this->communityRepository->insertReview($comment);
        } catch (\PDOException $e) {
            throw new HttpException(500, INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteReviews($request)
    {

        foreach ($request['ids'] as $id) {
            $this->communityRepository->deleteReview($id);
        }
    }
}
