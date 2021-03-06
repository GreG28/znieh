<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * UnlockedGameObjectRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UnlockedGameObjectRepository extends EntityRepository
{
	public function findUnlockedObjectsByUserByBuilding($user, $building)
	{
		$qb = $this->createQueryBuilder('l');
    $query = $qb->select('l')
                ->leftJoin('l.user', 'u')
         				->leftJoin('l.object', 'o')
       				  ->leftJoin('o.step', 's')
                ->addSelect('o')
                ->where($qb->expr()->eq('s.building', $building))
                ->andWhere($qb->expr()->eq('l.user', $user))
                ->getQuery();

      return $query->getResult();
	}

  public function findUnlockedArmorPartsByUserAndType($userId, $typeId)
  {
      $qb = $this->createQueryBuilder('a');
      $query =  $qb->leftJoin('a.step', 's')
                   ->where($qb->expr()->eq('s.building', $building))
                   ->getQuery();
      return $query->getResult();
  }
}
